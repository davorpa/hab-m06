const path = require("path");
const fs = require("fs");

// NOTA: uso métodos síncronos (no recomendado en un entorno de peticiones http)

// Datos a escribir
const data = [
  { name: "Lula", breed: "Golden" },
  { name: "Toby", breed: "German Shepperd" },
];

// Creo la ruta donde escribir
const output = path.join(__dirname, "dogs.json");

// Escribo los datos en la ruta (convertidos a String)
fs.writeFileSync(output, JSON.stringify(data, null, 2));

console.log("El fichero json está escrito");
