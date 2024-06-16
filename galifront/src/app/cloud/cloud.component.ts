import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteService } from '../services/cliente/cliente.service';
import { CloudService } from '../services/cloud/cloud.service';

@Component({
  selector: 'app-cloud',
  templateUrl: './cloud.component.html',
  styleUrls: ['./cloud.component.css']
})
export class CloudComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  cloudForm: FormGroup;
  clouds: any;
  clientes: any;
  dataSource: MatTableDataSource<any>;

  displayedColumns: string[] = ['id', 'email', 'password', 'nombre', 'storage', 'rol', 'fechaAlta', 'fechaModif', 'fechaBaja', 'options'];

  panelOpenState = false;
  filtroCloud: string = '';

  constructor(
    public fb: FormBuilder,
    public cloudService: CloudService,
    public clienteService: ClienteService
  ) {

  }
  ngAfterViewInit(): void {
    this.setDataAndPagination();
  }
  ngOnInit(): void {

    this.cloudForm = this.fb.group({
      id: [''],
      email: ['', Validators.required],
      password: ['', Validators.required],
      nombre: ['', Validators.required],
      Storage: ['', Validators.required],
      rol: ['', Validators.required],
      fechaAlta:  [''],
      fechaModif:  [''],
      fechaBaja:  [''],
    });

    this.cloudService.getAllCloud().subscribe(resp => {
      this.clouds = resp;
    },
      error => { console.error(error) }
    );

    this.cloudService.getAllCloud().subscribe(resp => {
      this.clouds = resp;
      this.setDataAndPagination();
    },
      error => { console.error(error) }
    );

  
  }
   // Función para aplicar el filtro al cambiar el valor en el campo de búsqueda
   applyFilter() {
    const filtroValor = this.filtroCloud.trim().toLowerCase();
    this.dataSource.filter = filtroValor;
  }

  /**
   * Metodo que llama el boton de guardar. Enviamos la peticion la servicio, luego reseteamos el formulario, filtramos
   * y reseteamos la paginacion.
   */
  guardar(): void {
    this.cloudService.saveCloud(this.cloudForm.value).subscribe(resp => {
      this.cloudForm.reset();
      this.cloudForm.setErrors(null);
      this.clouds=this.clouds.filter(cloud=> resp.id!==cloud.id);
      this.clouds.push(resp);
      this.setDataAndPagination();
    },
      error => { console.error(error) }
    )
  }

  /**
   * Metodo que elimina una cloud, luego reseteamos la paginacion.
   * @param cloud parametro donde se indica la cloud a eliminar.
   */
  eliminar(cloud){
    this.cloudService.deleteCloud(cloud.id).subscribe(resp=>{
      if(resp){
        this.clouds.pop(cloud);
        this.setDataAndPagination();
      }
    })
  }

  /**
   * Seteamos los datos en el formulario con la cloud que vamos a editar.
   * @param cloud parametro donde se indica la cloud a eliminar.
   */
  editar(cloud){
    this.cloudForm.setValue({
      id: cloud.id,
      email: cloud.email ,
      password: cloud.password ,
      nombre: cloud.nombre,
      Storage: cloud.storage,
      rol: cloud.rol,
      fechaAlta: cloud.fechaAlta,
      fechaModif: cloud.fechaModif,
      fechaBaja: cloud.fechaBaja
    });
    this.panelOpenState = !this.panelOpenState;
  }

  setDataAndPagination(){
    this.dataSource = new MatTableDataSource(this.clouds);
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
