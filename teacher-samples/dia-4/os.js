const os = require("os");

const memoria_total = os.totalmem();
const memoria_libre = os.freemem();

console.log("memoria total", memoria_total);
console.log("memoria_libre", memoria_libre);
console.log("hostname", os.hostname());
console.log("directorio personal", os.homedir());
console.log("directorio temporal", os.tmpdir());
