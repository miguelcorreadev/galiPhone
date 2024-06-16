import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteService } from '../services/cliente/cliente.service';
import { FTTHService } from '../services/ftth/ftth.service';

@Component({
  selector: 'app-ftth',
  templateUrl: './ftth.component.html',
  styleUrls: ['./ftth.component.css']
})
export class FTTHComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ftthForm: FormGroup;
  ftths: any[];
  clientes: any[];
  dataSource: MatTableDataSource<any>;

  displayedColumns: string[] = ['id', 'email', 'nombre', 'velocidad', 'fijo', 'portabilidad', 'operacion', 'estado', 'operadora', 'fechaAlta', 'fechaModif', 'fechaBaja', 'options'];

  panelOpenState = false;

  constructor(
    public fb: FormBuilder,
    public ftthService: FTTHService,
    public clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.ftthForm = this.fb.group({
      id: [''],
      email: [''],
      nombre: ['', Validators.required],
      velocidad: ['', Validators.required],
      fijo: [''],
      portabilidad: [''],
      operacion: [''],
      estado: [''],
      operadora: [''],
      fechaAlta: ['', Validators.required],
      fechaModif: [''],
      fechaBaja: [''],
    });

    this.loadFTTHs();
    this.loadClientes();
    
  }

  loadFTTHs(): void {
    this.ftthService.getAllFTTH().subscribe(
      resp => {
        this.ftths = resp;
        this.setDataAndPagination();
      },
      error => {
        console.error('Error loading FTTH:', error);
      }
    );
  }

  loadClientes(): void {
    this.clienteService.getAllClientes().subscribe(
      resp => {
        this.clientes = resp;
      },
      error => {
        console.error('Error loading clientes:', error);
      }
    );
  }

  guardar(): void {
    if (this.ftthForm.valid) {
      this.ftthService.saveFTTH(this.ftthForm.value).subscribe(
        resp => {
          this.ftthForm.reset();
          this.ftths = this.ftths.filter(ftth => resp.id !== ftth.id);
          this.ftths.push(resp);
          this.setDataAndPagination();
          this.panelOpenState = false; // Cerrar panel de expansión después de guardar
        },
        error => {
          console.error('Error saving FTTH:', error);
        }
      );
    } else {
      // Manejo de validaciones del formulario
    }
  }

  eliminar(ftth): void {
    this.ftthService.deleteFTTH(ftth.id).subscribe(
      resp => {
        if (resp) {
          this.ftths = this.ftths.filter(p => p.id !== ftth.id);
          this.setDataAndPagination();
        }
      },
      error => {
        console.error('Error deleting FTTH:', error);
      }
    );
  }

  editar(ftth): void {
    this.ftthForm.setValue({
      id: ftth.id,
      email: ftth.email,
      nombre: ftth.nombre,
      velocidad: ftth.velocidad,
      fijo: ftth.fijo,
      portabilidad: ftth.portabilidad,
      operacion: ftth.operacion,
      estado: ftth.estado,
      operadora: ftth.operadora,
      fechaAlta: ftth.fechaAlta,
      fechaModif: ftth.fechaModif,
    });
    this.panelOpenState = true; // Abrir panel de edición
  }

  setDataAndPagination(): void {
    this.dataSource = new MatTableDataSource(this.ftths);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Métodos para la paginación
  goToNextPage(): void {
    this.paginator.nextPage();
  }

  goToPreviousPage(): void {
    this.paginator.previousPage();
  }

  goToFirstPage(): void {
    this.paginator.firstPage();
  }

  goToLastPage(): void {
    this.paginator.lastPage();
  }

  // Método para el ordenamiento
  sortBy(column: string): void {
    this.sort.active = column;
    this.sort.direction = this.sort.direction === 'asc' ? 'desc' : 'asc';
    this.dataSource.sort = this.sort;
  }
}
