import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  pending : string = "";
  current : string = "0";
  operation: string = "";

  constructor() { }

  addNumber(numberString: string): void {
    if(!(numberString == '.' && this.current.slice(this.current.length - 1) === '.')){
      this.current = this.current + numberString
  }
}

  deleteNumber(): void {
    if(this.current.length > 2){
      this.current = this.current.slice(0,-1);
    }else{
      this.current = "0";
    }
  }

  clear(): void {
    this.current = "0";
    this.pending = "";
    this.operation = "";
  }

  calculate() {
    let result: number;
    let pendingFloat = parseFloat(this.pending)
    let currentFloat = parseFloat(this.current);
    if(isNaN(pendingFloat) || isNaN(currentFloat)) return;
    switch (this.operation) {
      case "+":
        result = pendingFloat + currentFloat
        break;
        case "-":
          result = pendingFloat - currentFloat;
          break;
        case "*":
          result = pendingFloat * currentFloat;
          break;
        case "/":
          result = pendingFloat / currentFloat;
          break;
        default:
          return;
      }
      this.current = result.toString();
      this.operation = "";
      this.pending = "";

  }

  selectOp(operation: string) {
    if(this.current === ""){
      this.operation = operation
      return;
    }else if(this.pending !== ""){
      this.calculate()
    }
    this.operation = operation;
    this.pending = this.current;
    this.current = "";
  };

  displayNumber(stringNumber: string): string  {
    const integer = parseFloat(stringNumber.split(".")[0]);
    const decimal = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integer)) {
      integerDisplay = "";
    } else {
      integerDisplay = integer.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimal != null) {
      return `${integerDisplay}.${decimal}`;
    } else {
      return integerDisplay;
    }
  };


  ngOnInit(): void {
  }

}
