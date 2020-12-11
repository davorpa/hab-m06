const { add, substract, multiply, divide } = require("./lib/operations");
const translations = require("./lib/translations");

const valid_operations = ["suma", "resta", "multiplica", "divide"];

// Detectar el idioma del resultado
const language = process.env.LANG === "en" ? "en" : "es";

// Desesctructuro los argumentos en constantes
const args = process.argv.slice(2);
const [operation, valueA, valueB] = args;

// Si falta algún argumento salgo del programa
if (!operation || !valueA || !valueB) {
  console.error("Faltan argumentos");
  process.exit(1);
}

// Si la operación no es conocida salgo del programa
if (!valid_operations.includes(operation)) {
  console.error("No reconozco la operación");
  process.exit(1);
}

// Convierto a números los argumentos y compruebo que sean números válidos
const a = Number(valueA);
const b = Number(valueB);

if (isNaN(a) || isNaN(b)) {
  console.error("Los valoras no son numéricos");
  process.exit(1);
}

// Calculo el resultado
let result;

switch (operation) {
  case "suma":
    result = add(a, b);
    break;
  case "resta":
    result = substract(a, b);
    break;
  case "multiplica":
    result = multiply(a, b);
    break;
  case "divide":
    result = divide(a, b);
    break;
}

// Comprobamos que el resultado no sea indeterminado
if (isNaN(result)) {
  console.error("El resultado es indeterminado");
  process.exit(1);
}

// Comprobamos que el número no sea infinito
if (!isFinite(result)) {
  console.error("El resultado es infinito o menos infinito");
  process.exit(1);
}

if (language === "es") {
  // español
  console.log(
    `El resultado de ${translations[operation][language]} ${a} y ${b} es: ${result}`
  );
} else {
  // inglés
  console.log(
    `The result of ${translations[operation][language]} ${a} and ${b} is: ${result}`
  );
}
