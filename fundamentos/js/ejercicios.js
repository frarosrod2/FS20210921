function isNumber(n) {
  return !isNaN(parseFloat(n)) && !isNaN(n - 0);
}

function randomRange(min, max) {
  if (isNumber(min) && isNumber(max)) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

function guessNumber() {
  let count = 0;
  let randomNumber = randomRange(0, 100);
  while (count < 10) {
    let input = prompt("Adivina el número: ");
    if (input == randomNumber) {
      alert("¡Has encontrado la solución!");
      return;
    } else if (input < randomNumber) {
      alert("El número introducido es menor que la solución");
      count++;
    } else if (input > randomNumber) {
      alert("El número introducido es mayor que la solución");
      count++;
    } else {
      alert("Debe introducir un número");
      count++;
    }
  }
  alert("Juego finalizado. No ha conseguido adivinar el número.");
}

function createArray(size, values) {
  if (isNumber(size)) return new Array(parseFloat(size)).fill(values);
  return [];
}

function isPrime(num) {
  for (var i = 2; i < num; i++) if (num % i === 0) return false;
  return num > 1;
}

function getPrimes(number) {
  let primes = [];
  if (isNumber(number) && Math.sign(number) === 1) {
    for (var i = 0; i < 7919; i++) {
      if (primes.length === number) break;
      if (isPrime(i)) primes.push(i);
    }
  }
  return primes;
}

function isNIF(dni) {
  let re = new RegExp("^\\d{1,8}[A-Z]$");
  if (re.test(dni)) {
    var letraDNI = dni.substring(8, 9).toUpperCase();
    var numDNI = parseInt(dni.substring(0, 8));
    //Se calcula la letra correspondiente al número
    var letras = [
      "T",
      "R",
      "W",
      "A",
      "G",
      "M",
      "Y",
      "F",
      "P",
      "D",
      "X",
      "B",
      "N",
      "J",
      "Z",
      "S",
      "Q",
      "V",
      "H",
      "L",
      "C",
      "K",
      "E",
      "T",
    ];
    var letraCorrecta = letras[numDNI % 23];

    if (letraDNI != letraCorrecta) {
      return false;
    } else {
      return true;
    }
  }
  return false;
}

function palindrome(str) {
  if (typeof str === "string") {
    var re = /[\W_]/g;
    var lowRegStr = str.toLowerCase().replace(re, "");
    var reverseStr = lowRegStr.split("").reverse().join("");
    return reverseStr === lowRegStr;
  }
  return false;
}
