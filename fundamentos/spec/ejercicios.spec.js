describe("JavaScript tests", function () {
  [2, 22, "55"].forEach((caso) => {
    it(`isNumber test positive, caso ${caso}`, function () {
      expect(isNumber(caso)).toBeTrue();
    });
  });

  ["fff", undefined, "ddd"].forEach((caso) => {
    it(`isNumber test negative, caso ${caso}`, function () {
      expect(isNumber(caso)).toBeFalse();
    });
  });

  it("random range test positive", function () {
    let min = -10,
      max = 100;
    let res = randomRange(min, max);

    expect(res).not.toBeNaN();
    expect(res).toBeLessThanOrEqual(100);
    expect(res).toBeGreaterThanOrEqual(-10);
  });

  it("random range test negative", function () {
    let min = "ff",
      max = 100;
    let res = randomRange(min, max);

    expect(res).not.toBeNaN();
  });

  it(`Guess number menor`, function () {
    let juego = new Juego(0, 25);
    juego.comparar(4);

    expect(juego.message).toBe("El número introducido es menor a la solución");
  });

  it(`Guess number igual`, function () {
    let juego = new Juego(0, 36);
    juego.comparar(36);

    expect(juego.message).toBe("¡Has adivinado el número!");
  });

  it(`Guess number mayor`, function () {
    let juego = new Juego(0, 36);
    juego.comparar(45);

    expect(juego.message).toBe("El número introducido es mayor a la solución");
  });

  it(`Guess number fail`, function () {
    let juego = new Juego(0, 36);
    juego.comparar('fff');

    expect(juego.message).toBe("Debe introducir un número");
  });

  it(`create array test positive, caso ${[5, 6]}`, function () {
    let res = createArray(5, 6);

    expect(res).toHaveSize(5);
    expect(res).toEqual([6, 6, 6, 6, 6]);
    expect(Array.isArray(res)).toBeTrue();
  });

  it("create array test negative", function () {
    let size = "g",
      values = 6;
    let res = createArray(size, values);

    expect(Array.isArray(res)).toBeTrue();
    expect(res).toHaveSize(0);
  });

  ["7", 13, "37"].forEach((caso) => {
    it(`isNumber test positive, caso ${caso}`, function () {
      expect(isPrime(caso)).toBeTrue();
    });
  });

  ["ff", undefined].forEach((caso) => {
    it(`isNumber test positive, caso ${caso}`, function () {
      expect(isPrime(caso)).toBeFalse();
    });
  });

  it("getPrimes test positive", function () {
    let size = 15;
    let res = getPrimes(size);

    expect(Array.isArray(res)).toBeTrue();
    expect(res).toHaveSize(15);
    expect(res).toEqual([
      2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47,
    ]);
  });

  it("getPrimes test negative", function () {
    let size = -1;
    let res = getPrimes(size);

    expect(Array.isArray(res)).toBeTrue();
    expect(res).toHaveSize(0);
  });

  ["84335016L", "69962440M"].forEach((caso) => {
    it(`isNIF test positive, caso ${caso}`, function () {
      expect(isNIF(caso)).toBeTrue();
    });
  });

  ["84335016C", "6996244D", 6546453343, undefined].forEach((caso) => {
    it(`isNIF test negative, caso ${caso}`, function () {
      expect(isNIF(caso)).toBeFalse();
    });
  });

  [
    "reconocer",
    "A Mercedes, ese de crema",
    "A la catalana banal, atácala",
  ].forEach((caso) => {
    it(`isPalindrome test positive, caso ${caso}`, function () {
      expect(palindrome(caso)).toBeTrue();
    });
  });

  [
    "ola",
    "A Mercedesa, ese de crema",
    "A la catalanda banal, atácala",
    154848,
  ].forEach((caso) => {
    it(`isPalindrome test positive, caso ${caso}`, function () {
      expect(palindrome(caso)).toBeFalse();
    });
  });
});