const fs = require("fs").promises;
const path = require("path");

async function main() {
  try {
    const content = "El contenido del fichero 😂";

    await fs.writeFile(path.join(__dirname, "file.txt"), content);
    console.log("El fichero fue escrito correctamente");
  } catch (error) {
    console.error(error);
  }
}

main();
