import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorComponent } from './calculator.component';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("Add number", () => {
    component.addNumber('5');

    expect(component.current).toBe("05");
    expect(component.pending).toBe('');
    expect(component.operation).toBe("");

    component.addNumber('ff');

    expect(component.current).toBe("05ff");
    expect(component.pending).toBe('');
    expect(component.operation).toBe("");

  });

  it('Delete', () => {
    component.addNumber("5");
    component.deleteNumber();

    expect(component.current).toBe("0");

    component.addNumber("11");
    component.deleteNumber();

    expect(component.current).toBe("01");

  });

  it('Clear', () => {
    component.addNumber("5888");
    component.clear()

    expect(component.current).toBe("0");
    expect(component.pending).toBe("");
    expect(component.operation).toBe("");

  });

  it('Select operation', () => {
    component.addNumber("588");
    component.selectOp("+");

    expect(component.operation).toBe("+");
    expect(component.pending).toBe('0588');
    expect(component.current).toBe("");

    component.addNumber("3")
    component.selectOp("+");

    expect(component.current).toBe('');
    expect(component.operation).toBe('+');
    expect(component.pending).toBe("591");

    component.selectOp("+");
    component.selectOp("-");
    expect(component.operation).toBe('-');
    expect(component.pending).toBe("591");
    expect(component.current).toBe('');

  });

  it('Calculate', () => {
    component.addNumber("5.5");
    component.selectOp("-");
    component.addNumber("3")
    component.calculate()

    expect(component.current).toBe("2.5");
    expect(component.operation).toBe('');
    expect(component.pending).toBe('');

    component.selectOp("*");
    component.addNumber("0.5")
    component.calculate()

    expect(component.current).toBe("1.25");
    expect(component.operation).toBe('');
    expect(component.pending).toBe('');

    component.selectOp("/");
    component.addNumber("0.7")
    component.calculate()

    expect(component.current).toBe("1.7857142857142858");
    expect(component.operation).toBe('');
    expect(component.pending).toBe('');

  });

  it('Display number', () => {
    let stringNumber = component.displayNumber("18.88");

    expect(stringNumber).toBe("18.88");

    let stringNumber2 = component.displayNumber('ff');

    expect(stringNumber2).toBe("");
  });

});
