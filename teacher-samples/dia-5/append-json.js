const path = require("path");
const fs = require("fs");

// Leo el json como está en disco
const dogs = require("./dogs.json");

// Este es el contenido a añadir
const newDog = { name: "Torgas Pirracas", breed: "Can de palleiro" };

// Añado al json el nuevo perro
dogs.unshift(newDog);

// Creo la ruta donde escribir
const output = path.join(__dirname, "dogs.json");

// Escribo los datos en la ruta (convertidos a String)
fs.writeFileSync(output, JSON.stringify(dogs, null, 2));

console.log("El fichero json está escrito");
