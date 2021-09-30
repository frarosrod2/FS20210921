describe("Calculator tests", function () {
  it("Add number", () => {
    let calc = new Calculator();
    calc.addNumber(5);

    expect(calc.current).toBe("05");
    expect(calc.pending).toBe('');
    expect(calc.operation).toBe("");

    calc.addNumber('ff');

    expect(calc.current).toBe("05");
    expect(calc.pending).toBe('');
    expect(calc.operation).toBe("");

  });

  it('Delete', () => {
    let calc = new Calculator();
    calc.addNumber(5);
    calc.delete();

    expect(calc.current).toBe("0");

    calc.addNumber(11);
    calc.delete();

    expect(calc.current).toBe("01");

  });

  it('Clear', () => {
    let calc = new Calculator();
    calc.addNumber(5888);
    calc.clear()

    expect(calc.current).toBe(0);
    expect(calc.pending).toBe("");
    expect(calc.operation).toBe("");

  });

  it('Select operation', () => {
    let calc = new Calculator();
    calc.addNumber(588);
    calc.selectOp("+");

    expect(calc.operation).toBe("+");
    expect(calc.pending).toBe('0588');
    expect(calc.current).toBe("");

    calc.addNumber(3)
    calc.selectOp("+");

    expect(calc.current).toBe('');
    expect(calc.operation).toBe('+');
    expect(calc.pending).toBe(591);

  });

  it('Calculate', () => {
    let calc = new Calculator();
    calc.addNumber(5.5);
    calc.selectOp("-");
    calc.addNumber(3)
    calc.calculate()

    expect(calc.current).toBe(2.5);
    expect(calc.operation).toBe('');
    expect(calc.pending).toBe('');

    calc.selectOp("*");
    calc.addNumber(0.5)
    calc.calculate()

    expect(calc.current).toBe(1.25);
    expect(calc.operation).toBe('');
    expect(calc.pending).toBe('');

    calc.selectOp("/");
    calc.addNumber(0.7)
    calc.calculate()

    expect(calc.current).toBe(1.7857142857142858);
    expect(calc.operation).toBe('');
    expect(calc.pending).toBe('');

  });

  it('Display number', () => {
    let calc = new Calculator();
    let stringNumber = calc.displayNumber(18.88);

    expect(stringNumber).toBe("18.88");

    let stringNumber2 = calc.displayNumber('ff');

    expect(stringNumber2).toBe("");
  });
});
