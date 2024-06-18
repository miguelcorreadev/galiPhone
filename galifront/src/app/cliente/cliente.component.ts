import { Component, OnInit, ViewChild,ChangeDetectorRef  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductoService } from '../services/producto/producto.service';
import { ClienteService } from '../services/cliente/cliente.service';
import { AfterViewInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion'; 
import { ListarProductosService } from '../services/listarProductos/listarProductos.service';
import { ListarProductosComponent } from '../listar-productos/listar-productos.component';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']  
})
export class ClienteComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(ListarProductosComponent) listarProductosComponent: ListarProductosComponent;



  clienteForm: FormGroup;
  producto: any;
  clientes: any;
  dataSource: MatTableDataSource<any>;


  displayedColumns: string[] = ['id', 'name', 'apellido', 'email', 'direccion', 'telefono', 'options'];

  panelOpenState = false;
  filtroCliente: string = '';

  constructor(
    public fb: FormBuilder,
    public productoService: ProductoService,
    public clienteService: ClienteService,
    private cdRef: ChangeDetectorRef,
  ) {

  }
 
  ngOnInit(): void {

    this.clienteForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.required],
      direccion: [''],
      telefono: [''],
    });

    this.productoService.getAllProductos().subscribe(resp => {
      this.producto = resp;
    },
      error => { console.error(error) }
    );

    this.clienteService.getAllClientes().subscribe(resp => {
      this.clientes = resp;
      this.setDataAndPagination();
    },
      error => { console.error(error) }
    );

  
  }
   // Función para aplicar el filtro al cambiar el valor en el campo de búsqueda
   applyFilter() {
    const filtroValor = this.filtroCliente.trim().toLowerCase();
    this.dataSource.filter = filtroValor;
  }
 
  /**
   * Metodo que llama el boton de guardar. Enviamos la peticion la servicio, luego reseteamos el formulario, filtramos
   * y reseteamos la paginacion.
   */
  guardar(): void {
    this.clienteService.saveCliente(this.clienteForm.value).subscribe(resp => {
      this.clienteForm.reset();
      this.clienteForm.setErrors(null);
      this.clientes=this.clientes.filter(cliente=> resp.id!==cliente.id);
      this.clientes.push(resp);
      this.setDataAndPagination();
    },
      error => { console.error(error) }
    )
  }

  /**
   * Metodo que elimina una cliente, luego reseteamos la paginacion.
   * @param cliente parametro donde se indica la cliente a eliminar.
   */
  eliminar(cliente){
    this.clienteService.deleteCliente(cliente.id).subscribe(resp=>{
      if(resp){
        this.clientes.pop(cliente);
        this.setDataAndPagination();
      }
    })
  }

  /**
   * Seteamos los datos en el formulario con la cliente que vamos a editar.
   * @param cliente parametro donde se indica la cliente a eliminar.
   */

  
  editar(cliente){
    this.clienteForm.setValue({
      id:cliente.id,
      nombre: cliente.nombre ,
      apellido: cliente.apellido ,
      email: cliente.email,
      direccion: cliente.direccion,
      telefono: cliente.telefono,
    });
    this.panelOpenState = !this.panelOpenState;
  }
 // Método para listar productos del cliente
 listar(cliente): void {
  if (this.listarProductosComponent && typeof this.listarProductosComponent.getAllProducts === 'function') {
    this.listarProductosComponent.getAllProducts(cliente.email);
  } else {
    console.error('listarProductosComponent no está definido o no tiene el método getAllProducts.');
  }
}
ngAfterViewInit(cliente): void {
  this.setDataAndPagination();
  this.listar(this.clienteForm.get('email').value);
}

  setDataAndPagination(){
    this.dataSource = new MatTableDataSource(this.clientes);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // Filtro personalizado para buscar en múltiples columnas
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const dataStr = `${data.nombre.toLowerCase()} ${data.apellido.toLowerCase()} ${data.email.toLowerCase()} ${data.direccion.toLowerCase()} ${data.telefono.toLowerCase()}`;
      return dataStr.includes(filter);
    };
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
