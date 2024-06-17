import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteService } from '../services/cliente/cliente.service';
import { CloudService } from '../services/cloud/cloud.service';
import { OperadoraService } from '../services/operadora/operadora.service';
import { OperacionService } from '../services/operacion/operacion.service';
import { EstadoService } from '../services/estado/estado.service';

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
  operaciones: any[];
  operadoras: any[];
  estados: any[];
  dataSource: MatTableDataSource<any>;

  displayedColumns: string[] = ['id', 'email', 'password', 'nombre', 'storage', 'rol', 'operacion', 'estado', 'operadora', 'fechaAlta', 'fechaModif', 'fechaBaja', 'options'];

  panelOpenState = false;
  filtroCloud: string = '';

  constructor(
    public fb: FormBuilder,
    public cloudService: CloudService,
    public clienteService: ClienteService,
    public operacionService: OperacionService,
    public operadoraService: OperadoraService,
    public estadoService: EstadoService,
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
      storage: ['', Validators.required],
      rol: ['', Validators.required],
      operacion: [''],
      estado: [''],
      operadora: [''],
      fechaAlta: ['', Validators.required],
      fechaModif: [''],
      fechaBaja: [''],
    });

    this.cloudService.getAllCloud().subscribe(resp => {
      this.clouds = resp;
    },
      error => { console.error(error) }
    );
    this.loadClientes();
    this.loadClouds();
    this.loadOperaciones();
    this.loadOperadoras();
    this.loadEstados();

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
  loadClouds(): void {
    this.cloudService.getAllCloud().subscribe(
      resp => {
        this.clouds = resp;
        this.setDataAndPagination();
      },
      error => {
        console.error('Error loading Clouds:', error);
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
  loadOperaciones(): void {
    this.operacionService.getAllOperaciones().subscribe(
      resp => {
        this.operaciones = resp;
      },
      error => {
        console.error('Error loading operaciones:', error);
      }
    );
  }
  loadEstados(): void {
    this.estadoService.getAllEstados().subscribe(
      resp => {
        this.estados = resp;
      },
      error => {
        console.error('Error loading estados:', error);
      }
    );
  }
  loadOperadoras(): void {
    this.operadoraService.getAllOperadoras().subscribe(
      resp => {
        this.operadoras = resp;
      },
      error => {
        console.error('Error loading operadoras:', error);
      }
    );
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
      storage: cloud.storage,
      rol: cloud.rol,
      operacion: cloud.operacion,
      operadora: cloud.operadora,
      estado: cloud.estado,
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

  showPassword = false;

togglePasswordVisibility(): void {
  this.showPassword = !this.showPassword;
}
}
