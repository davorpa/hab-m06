const json = require("./datos.json");

console.log(json.name);
console.log(json.skills);

// Método largo
//
// const path = require("path");
// const fs = require("fs");
//
// try {
//   // Creo la ruta al fichero
//   const file = path.join(__dirname, "datos.json");

//   // Leo *sincronamente* la ruta
//   const fileData = fs.readFileSync(file, "utf-8");

//   // Convierto a json los contenidos leídos
//   const json = JSON.parse(fileData);

//   // Imprimo varias propiedades del json
//   console.log(json.name);
//   console.log(json.skills);
// } catch (error) {
//   console.error(error);
// }
