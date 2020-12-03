const c = require("./src/a");

console.log(`El valor actualmente es: ${c.valor}`);
c.valor = 500;

require("./src/b");
