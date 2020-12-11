const path = require("path");

const directory = "../uploads";
const file_from_db = "foto_33.png";

const dir = path.join(__dirname, directory, file_from_db);

console.log(dir);

const basename = path.basename(dir, ".png");

console.log(basename);

const p = "/Users/berto/Hackaboss/JSB01RT/mod6-backend/uploads/foto_33.png";

// Saca el directorio donde está el fichero
console.log(path.dirname(p));

// Sacar la extensión de un fichero
console.log(path.extname(p));

const path_regular = "/home/berto/../usuario/./uploads/../2010/docs.pdf";
// /home/usuario/2010/docs.pdf

console.log(path.normalize(path_regular));
