const fs = require("fs").promises;
const path = require("path");

// fs.readFile nos permite leer los contenidos de un fichero

async function main() {
  try {
    const file = path.join(__dirname, "../hola.txt");

    const contents = await fs.readFile(file, "utf-8");

    console.log(contents);
  } catch (error) {
    console.error(error);
  }
}

main();
