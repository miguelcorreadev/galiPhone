import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EstadoService } from '../services/estado/estado.service';
import { ClienteService } from '../services/cliente/cliente.service';

@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.css']
})
export class EstadoComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  estadoForm: FormGroup;
  estados: any[];
  clientes: any[];
  dataSource: MatTableDataSource<any>;

  displayedColumns: string[] = ['id', 'nombre', 'options'];

  panelOpenState = false;

  constructor(
    public fb: FormBuilder,
    public estadoService: EstadoService,
    public clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.estadoForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
    });

    this.loadEstados();
    this.loadClientes();
  }

  loadEstados(): void {
    this.estadoService.getAllEstados().subscribe(
      resp => {
        this.estados = resp;
        this.setDataAndPagination();
      },
      error => {
        console.error('Error loading estados:', error);
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
    if (this.estadoForm.valid) {
      this.estadoService.saveEstado(this.estadoForm.value).subscribe(
        resp => {
          this.estadoForm.reset();
          this.estados = this.estados.filter(estado => resp.id !== estado.id);
          this.estados.push(resp);
          this.setDataAndPagination();
          this.panelOpenState = false; // Cerrar panel de expansión después de guardar
        },
        error => {
          console.error('Error saving estado:', error);
        }
      );
    } else {
      // Manejo de validaciones del formulario
    }
  }

  eliminar(estado): void {
    this.estadoService.deleteEstado(estado.id).subscribe(
      resp => {
        if (resp) {
          this.estados = this.estados.filter(p => p.id !== estado.id);
          this.setDataAndPagination();
        }
      },
      error => {
        console.error('Error deleting estado:', error);
      }
    );
  }

  editar(estado): void {
    this.estadoForm.setValue({
      id: estado.id,
      nombre: estado.nombre,
    });
    this.panelOpenState = true; // Abrir panel de edición
  }

  setDataAndPagination(): void {
    this.dataSource = new MatTableDataSource(this.estados);
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
