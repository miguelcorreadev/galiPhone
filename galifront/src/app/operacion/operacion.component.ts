import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OperacionService } from '../services/operacion/operacion.service';
import { ClienteService } from '../services/cliente/cliente.service';

@Component({
  selector: 'app-operacion',
  templateUrl: './operacion.component.html',
  styleUrls: ['./operacion.component.css']
})
export class OperacionComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  operacionForm: FormGroup;
  operaciones: any[];
  clientes: any[];
  dataSource: MatTableDataSource<any>;

  displayedColumns: string[] = ['id', 'nombre', 'options'];

  panelOpenState = false;

  constructor(
    public fb: FormBuilder,
    public operacionService: OperacionService,
    public clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.operacionForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
    });

    this.loadOperaciones();
    this.loadClientes();
  }

  loadOperaciones(): void {
    this.operacionService.getAllOperaciones().subscribe(
      resp => {
        this.operaciones = resp;
        this.setDataAndPagination();
      },
      error => {
        console.error('Error loading operaciones:', error);
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
    if (this.operacionForm.valid) {
      this.operacionService.saveOperacion(this.operacionForm.value).subscribe(
        resp => {
          this.operacionForm.reset();
          this.operaciones = this.operaciones.filter(operacion => resp.id !== operacion.id);
          this.operaciones.push(resp);
          this.setDataAndPagination();
          this.panelOpenState = false; // Cerrar panel de expansión después de guardar
        },
        error => {
          console.error('Error saving operacion:', error);
        }
      );
    } else {
      // Manejo de validaciones del formulario
    }
  }

  eliminar(operacion): void {
    this.operacionService.deleteOperacion(operacion.id).subscribe(
      resp => {
        if (resp) {
          this.operaciones = this.operaciones.filter(p => p.id !== operacion.id);
          this.setDataAndPagination();
        }
      },
      error => {
        console.error('Error deleting operacion:', error);
      }
    );
  }

  editar(operacion): void {
    this.operacionForm.setValue({
      id: operacion.id,
      nombre: operacion.nombre,
    });
    this.panelOpenState = true; // Abrir panel de edición
  }

  setDataAndPagination(): void {
    this.dataSource = new MatTableDataSource(this.operaciones);
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
