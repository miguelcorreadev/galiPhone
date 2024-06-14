import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FTTHComponent } from './ftth.component';

describe('FTTHComponent', () => {
  let component: FTTHComponent;
  let fixture: ComponentFixture<FTTHComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FTTHComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FTTHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
