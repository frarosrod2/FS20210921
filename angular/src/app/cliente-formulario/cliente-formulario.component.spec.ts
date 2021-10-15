import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LoggerService, MyCoreModule } from 'src/lib/my-core';
import { NotificationService } from '../common-services';

import { ClienteFormularioComponent } from './cliente-formulario.component';

describe('ClienteFormularioComponent', () => {
  let component: ClienteFormularioComponent;
  let fixture: ComponentFixture<ClienteFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteFormularioComponent ],
      providers: [ NotificationService, LoggerService ],
      imports: [ HttpClientTestingModule, MyCoreModule, FormsModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
