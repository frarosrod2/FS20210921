describe("JavaScript tests", function () {
  it("isNumber test positive", function () {
    let res = isNumber("4");
    let res2 = isNumber(4);

    expect(res).toBeTrue();
    expect(res2).toBeTrue();
  });

  it("isNumber test negative", function () {
    let res = isNumber("ff");
    let res2 = isNumber(undefined);

    expect(res).not.toBeTrue();
    expect(res2).not.toBeTrue();
  });

  it("random range test positive", function () {
    let min = -10,
      max = 100;
    let res = randomRange(min, max);

    expect(res).toBeLessThanOrEqual(100);
    expect(res).toBeGreaterThanOrEqual(-10);
    expect(res).not.toBeNaN();
    expect(Number.isInteger(res)).toBeTrue();
  });

  it("random range test negative", function () {
    let min = "ff",
      max = 100;
    let res = randomRange(min, max);

    expect(res).not.toBeNaN();
  });

  it("create array test positive", function () {
    let size = 5,
      values = 6;
    let size2 = "5",
      values2 = "h";
    let res = createArray(size, values);
    let res2 = createArray(size2, values2);

    expect(res).toHaveSize(5);
    expect(res).toEqual([6, 6, 6, 6, 6]);
    expect(Array.isArray(res)).toBeTrue();
    expect(res2).toHaveSize(5);
    expect(res2).toEqual(["h", "h", "h", "h", "h"]);
    expect(Array.isArray(res2)).toBeTrue();
  });

  it("create array test negative", function () {
    let size = "g",
      values = 6;
    let res = createArray(size, values);

    expect(Array.isArray(res)).toBeTrue();
    expect(res).toHaveSize(0);
  });

  it("isPrime test", function () {
    let number = 7;
    let number2 = -12;
    let res = isPrime(number);
    let res2 = isPrime(number2);

    expect(res).toBeTrue();
    expect(res2).toBeFalse();
  });

  it("getPrimes test positive", function () {
    let size = 15;
    let res = getPrimes(size);

    expect(Array.isArray(res)).toBeTrue();
    expect(res).toHaveSize(15);
  });

  it("getPrimes test negative", function () {
    let size = -1;
    let res = getPrimes(size);

    expect(Array.isArray(res)).toBeTrue();
    expect(res).toHaveSize(0);
  });

  it("isNIF test", function () {
    let string = '84335016L';
    let number = 1243423243;
    let string2 = '4334334'
    let res = isNIF(string);
    let res2 = isNIF(number);
    let res3 = isNIF(string2);

    expect(res).toBeTrue();
    expect(res2).toBeFalse();
    expect(res3).toBeFalse();
  });

  it("palindrome test", function () {
    let word = 'reconocer';
    let number = 124343;
    let sentence = 'A Mercedes, ese de crema'
    let sentence2 = 'A la catalana banal, atácala'
    let res = palindrome(word);
    let res2 = palindrome(sentence);
    let res3 = palindrome(sentence2);
    let res4 = palindrome(number);

    expect(res).toBeTrue();
    expect(res2).toBeTrue();
    expect(res3).toBeFalse();
    expect(res4).toBeFalse();
  });

});
