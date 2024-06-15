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

  displayedColumns: string[] = ['id', 'email', 'nombre', 'velocidad', 'fijo', 'portatbilidad', 'operacion', 'estado', 'operadora', 'fechaAlta', 'fechaModif', 'fechaBaja', 'options'];

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
      fijo: ['', Validators.required],
      portabilidad: ['', Validators.required],
      operacion: ['', Validators.required],
      estado: ['', Validators.required],
      operadora: ['', Validators.required],
      fechaAlta: ['', Validators.required],
      fechaModif: ['', Validators.required],
      fechaBaja: ['', Validators.required],
    });

    this.loadFTTHs();
    this.loadClientes();
  }

  loadFTTHs(): void {
    this.ftthService.getAllFTTHs().subscribe(
      resp => {
        this.ftth = resp;
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
      this.ftthService.saveProducto(this.ftthForm.value).subscribe(
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

  eliminar(producto): void {
    this.productoService.deleteProducto(producto.id).subscribe(
      resp => {
        if (resp) {
          this.productos = this.productos.filter(p => p.id !== producto.id);
          this.setDataAndPagination();
        }
      },
      error => {
        console.error('Error deleting producto:', error);
      }
    );
  }

  editar(producto): void {
    this.productoForm.setValue({
      id: producto.id,
      email: producto.email,
      nombre: producto.nombre,
      tipo: producto.tipo, 
      char1: producto.char1,
      char2: producto.char2,
      char3: producto.char3,
    });
    this.panelOpenState = true; // Abrir panel de edición
  }

  setDataAndPagination(): void {
    this.dataSource = new MatTableDataSource(this.productos);
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
