function Calculator() {
  this.pending = "";
  this.current = 0;
  this.operation = "";

  this.addNumber = function (number) {
      let currentString = this.current.toString()
    if (!isNaN(number) || (number == '.' && currentString.slice(currentString.length - 1) !== '.')) {
      this.current = currentString + number.toString();
    }
  };

  this.delete = function () {
    if (this.current.toString().length > 2) {
      this.current = this.current.toString().slice(0, -1);
    } else {
      this.current = "0";
    }
  };

  this.clear = function () {
    this.current = 0;
    this.pending = "";
    this.operation = "";
  };

  this.calculate = function () {
    let result;
    const pendingFloat = parseFloat(this.pending);
    const currentFloat = parseFloat(this.current);
    if (isNaN(pendingFloat) || isNaN(currentFloat)) return;
    switch (this.operation) {
      case "+":
        result = pendingFloat + currentFloat;
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
    this.current = result;
    this.operation = "";
    this.pending = "";
  };

  this.selectOp = function (operation) {
    if (this.current === "") return;
    if (this.pending !== "") {
      this.calculate();
    }
    this.operation = operation;
    this.pending = this.current;
    this.current = "";
  };

  this.displayNumber = function (number) {
    const stringNumber = number.toString();
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

  this.updateScreen = function (
    currentOperandTextElement,
    pendingOperandTextElement
  ) {
    currentOperandTextElement.innerText = this.displayNumber(this.current);
    if (this.operation != null) {
      pendingOperandTextElement.innerText = `${this.displayNumber(
        this.pending
      )} ${this.operation}`;
    } else {
      pendingOperandTextElement.innerText = "";
    }
  };
}
