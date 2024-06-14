import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductoService } from '../services/producto/producto.service';
import { ClienteService } from '../services/cliente/cliente.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  productoForm: FormGroup;
  productos: any[];
  clientes: any[];
  dataSource: MatTableDataSource<any>;

  displayedColumns: string[] = ['id', 'email', 'nombre', 'tipo', 'char1', 'char2', 'char3', 'options'];

  panelOpenState = false;

  constructor(
    public fb: FormBuilder,
    public productoService: ProductoService,
    public clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.productoForm = this.fb.group({
      id: [''],
      email: [''],
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      char1: ['', Validators.required],
      char2: ['', Validators.required],
      char3: ['', Validators.required],
    });

    this.loadProductos();
    this.loadClientes();
  }

  loadProductos(): void {
    this.productoService.getAllProductos().subscribe(
      resp => {
        this.productos = resp;
        this.setDataAndPagination();
      },
      error => {
        console.error('Error loading productos:', error);
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
    if (this.productoForm.valid) {
      this.productoService.saveProducto(this.productoForm.value).subscribe(
        resp => {
          this.productoForm.reset();
          this.productos = this.productos.filter(producto => resp.id !== producto.id);
          this.productos.push(resp);
          this.setDataAndPagination();
          this.panelOpenState = false; // Cerrar panel de expansión después de guardar
        },
        error => {
          console.error('Error saving producto:', error);
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