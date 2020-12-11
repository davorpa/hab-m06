const path = require("path");
const fs = require("fs");

const contenido = "Lorem ipsum 😇";
const fichero = "texto.txt";

// Genero la ruta
const ruta_fichero = path.join(__dirname, fichero);

// Escribo el fichero
fs.writeFile(ruta_fichero, contenido, (error) => {
  if (error) console.error(error.message);

  console.log("el fichero ya está escrito");
});
