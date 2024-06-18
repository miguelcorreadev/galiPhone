import { Component, Input, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ListarProductosService } from '../services/listarProductos/listarProductos.service';


@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() clientEmail: string; // Recibe el email del cliente como Input

  listarProductosForm: FormGroup;
  producto: any;
  listarProductos: any[] = [];
  dataSource: MatTableDataSource<any>;

  displayedColumns: string[] = ['id', 'email', 'nombre', 'operacion', 'estado', 'operadora', 'options'];
  filtroCliente: string = '';

  constructor(
    private fb: FormBuilder,
    private listarProductosService: ListarProductosService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.listarProductosForm = this.fb.group({
      id: [''],
      email: [''],
      nombre: [''],
      operacion: [''],
      estado: [''],
      operadora: [''],
    });

    const email = 'laurasanchez@example.com';
    this.getAllProducts(this.clientEmail);
  }
  ngAfterViewInit(): void {
    this.setDataAndPagination();
  }
  
  applyFilter(): void {
    const filtroValor = this.filtroCliente.trim().toLowerCase();
    this.dataSource.filter = filtroValor;
  }

  setDataAndPagination(): void {
    this.dataSource = new MatTableDataSource(this.listarProductos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Filtro personalizado para buscar en múltiples columnas
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const dataStr = `${data.nombre.toLowerCase()} ${data.email.toLowerCase()} ${data.operacion.toLowerCase()} ${data.estado.toLowerCase()}`;
      return dataStr.includes(filter);
    };
  }
  getAllProducts(email: string): void {
    this.listarProductosService.getAllProducts(email).subscribe(
      resp => {
        this.producto = resp;
        this.listarProductos = resp; // Asigna los productos a listarProductos
        this.setDataAndPagination(); // Llama a setDataAndPagination después de obtener los productos
        this.cdRef.detectChanges(); // Forzar detección de cambios después de la actualización
      },
      error => {
        console.error(error);
      }
    );
  }
  // Métodos para la paginación personalizada
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

  // Métodos para el ordenamiento personalizado
  sortBy(column: string): void {
    this.sort.active = column;
    this.sort.direction = this.sort.direction === 'asc' ? 'desc' : 'asc';
    this.dataSource.sort = this.sort;
  }
}
