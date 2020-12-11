const { radio } = require("./lib/constantes");

setInterval(() => {
  console.log("El radio es", radio);
  console.log("LA FECHA ES", new Date().toISOString());
}, 1000);
