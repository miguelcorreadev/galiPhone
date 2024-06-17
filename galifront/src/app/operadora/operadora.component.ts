import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OperadoraService } from '../services/operadora/operadora.service';
import { ClienteService } from '../services/cliente/cliente.service';

@Component({
  selector: 'app-operadora',
  templateUrl: './operadora.component.html',
  styleUrls: ['./operadora.component.css']
})
export class OperadoraComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  operadoraForm: FormGroup;
  operadoras: any[];
  clientes: any[];
  dataSource: MatTableDataSource<any>;

  displayedColumns: string[] = ['id', 'nombre', 'servicios', 'options'];

  panelOpenState = false;

  constructor(
    public fb: FormBuilder,
    public operadoraService: OperadoraService,
    public clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.operadoraForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      servicios: [''],
    });

    this.loadOperadoras();
    this.loadClientes();
  }

  loadOperadoras(): void {
    this.operadoraService.getAllOperadoras().subscribe(
      resp => {
        this.operadoras = resp;
        this.setDataAndPagination();
      },
      error => {
        console.error('Error loading operadoras:', error);
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
    if (this.operadoraForm.valid) {
      this.operadoraService.saveOperadora(this.operadoraForm.value).subscribe(
        resp => {
          this.operadoraForm.reset();
          this.operadoras = this.operadoras.filter(operadora => resp.id !== operadora.id);
          this.operadoras.push(resp);
          this.setDataAndPagination();
          this.panelOpenState = false; // Cerrar panel de expansión después de guardar
        },
        error => {
          console.error('Error saving operadora:', error);
        }
      );
    } else {
      // Manejo de validaciones del formulario
    }
  }

  eliminar(operadora): void {
    this.operadoraService.deleteOperadora(operadora.id).subscribe(
      resp => {
        if (resp) {
          this.operadoras = this.operadoras.filter(p => p.id !== operadora.id);
          this.setDataAndPagination();
        }
      },
      error => {
        console.error('Error deleting operadora:', error);
      }
    );
  }

  editar(operadora): void {
    this.operadoraForm.setValue({
      id: operadora.id,
      nombre: operadora.nombre,
      servicios: operadora.servicios,
    });
    this.panelOpenState = true; // Abrir panel de edición
  }

  setDataAndPagination(): void {
    this.dataSource = new MatTableDataSource(this.operadoras);
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
