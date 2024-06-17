import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteService } from '../services/cliente/cliente.service';
import { MobileService } from '../services/mobile/mobile.service';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css']
})
export class MobileComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  mobileForm: FormGroup;
  mobiles: any[];
  clientes: any[];
  dataSource: MatTableDataSource<any>;

  displayedColumns: string[] = ['id', 'email', 'nombre', 'capacidad', 'mobile', 'portabilidad', 'operacion', 'estado', 'operadora', 'fechaAlta', 'fechaModif', 'fechaBaja', 'options'];
  filteredClientes = [];
  panelOpenState = false;

  constructor(
    public fb: FormBuilder,
    public mobileService: MobileService,
    public clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.mobileForm = this.fb.group({
      id: [''],
      email: [''],
      nombre: ['', Validators.required],
      capacidad: ['', Validators.required],
      mobile: ['', Validators.required],
      portabilidad: [''],
      operacion: [''],
      estado: [''],
      operadora: [''],
      fechaAlta: ['', Validators.required],
      fechaModif: [''],
      fechaBaja: [''],
      clienteFiltro: [''], // Campo para el filtro
    });
    this.filteredClientes = this.clientes;

    this.mobileForm.get('clienteFiltro').valueChanges.subscribe(value => {
      this.filteredClientes = this.filterClientes(value);
    });
    this.loadMobiles();
    this.loadClientes();
    
  }


  loadMobiles(): void {
    this.mobileService.getAllMobile().subscribe(
      resp => {
        this.mobiles = resp;
        this.setDataAndPagination();
      },
      error => {
        console.error('Error loading Mobiles:', error);
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
  filterClientes(val: string) {
    return this.clientes.filter(cliente => 
      cliente.nombre.toLowerCase().includes(val.toLowerCase()) ||
      cliente.apellido.toLowerCase().includes(val.toLowerCase())
    );
  }
  guardar(): void {
    if (this.mobileForm.valid) {
      this.mobileService.saveMobile(this.mobileForm.value).subscribe(
        resp => {
          this.mobileForm.reset();
          this.mobiles = this.mobiles.filter(mobile => resp.id !== mobile.id);
          this.mobiles.push(resp);
          this.setDataAndPagination();
          this.panelOpenState = false; // Cerrar panel de expansión después de guardar
        },
        error => {
          console.error('Error saving Mobile:', error);
        }
      );
    } else {
      // Manejo de validaciones del formulario
    }
  }

  eliminar(mobile): void {
    this.mobileService.deleteMobile(mobile.id).subscribe(
      resp => {
        if (resp) {
          this.mobiles = this.mobiles.filter(p => p.id !== mobile.id);
          this.setDataAndPagination();
        }
      },
      error => {
        console.error('Error deleting Mobile:', error);
      }
    );
  }

  editar(mobile): void {
    this.mobileForm.setValue({
      id: mobile.id,
      email: mobile.email,
      nombre: mobile.nombre,
      capacidad: mobile.capacidad,
      mobile: mobile.mobile,
      portabilidad: mobile.portabilidad,
      operacion: mobile.operacion,
      estado: mobile.estado,
      operadora: mobile.operadora,
      fechaAlta: mobile.fechaAlta,
      fechaModif: mobile.fechaModif,
    });
    this.panelOpenState = true; // Abrir panel de edición
  }

  setDataAndPagination(): void {
    this.dataSource = new MatTableDataSource(this.mobiles);
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

