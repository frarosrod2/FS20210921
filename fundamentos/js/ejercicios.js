function isNumber(n) {
  return !isNaN(parseFloat(n)) && !isNaN(n - 0);
}

function randomRange(min, max) {
  if (isNumber(min) && isNumber(max)) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return "Rango introducido erróneo";
}

function Juego(count, random) {
  this.random = random;
  this.count = count;
  this.message = "";
  this.encontrado = false;

  this.comparar = function (input) {
    this.count++;
    console.log("En comp", this.count);
    count++;
    if (input == this.random) {
      this.message = "¡Has adivinado el número!";
      this.encontrado = true;
    } else if (this.count > 9) {
      this.message = "Te has quedado sin intentos";
      this.count = 0;
    } else if (input < this.random) {
      this.message = "El número introducido es menor a la solución";
    } else if (input > this.random) {
      this.message = "El número introducido es mayor a la solución";
    } else {
      this.message = `Debe introducir un número`;
    }
  };
}

function guessNumber() {
  let juego = new Juego(0, randomRange(0, 100));
  while (juego.count < 10 && juego.encontrado == false) {
    console.log("While", juego.count);
    let input = prompt(`Adivina el número (${juego.count} de 10)`);
    juego.comparar(input);
    alert(juego.message);
  }
  alert("Juego finalizado.");
  guessNumber();
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
    for (var i = 0; i < Infinity; i++) {
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

    return letraDNI == letraCorrecta;
  }
  return false;
}

function palindrome(str) {
  if (typeof str === "string") {
    let noAccent = str
      .normalize("NFD")
      .replace(
        /([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
        "$1"
      )
      .normalize();
    const newStr = noAccent.replace(/[\W_]/g, "").toLowerCase();
    const strReversed = newStr.split("").reverse().join("");
    return newStr === strReversed;
  }
  return false;
}
