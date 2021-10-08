import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCostumerButtons } from './form-buttons.component';

describe('FormCostumerButtons', () => {
  let component: FormCostumerButtons;
  let fixture: ComponentFixture<FormCostumerButtons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCostumerButtons ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCostumerButtons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
