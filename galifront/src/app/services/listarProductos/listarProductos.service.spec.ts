import { TestBed } from '@angular/core/testing';

import { ListarProductosService } from './listarProductos.service';

describe('ListarProductoService', () => {
  let service: ListarProductosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListarProductosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
