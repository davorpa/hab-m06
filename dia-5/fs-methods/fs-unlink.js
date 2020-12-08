const fs = require("fs").promises;
const path = require("path");

// fs.access accede a un fichero (y si da error el fichero no existe o no se puede leer)
// fs.unlink borra un fichero

async function main() {
  try {
    const fileToDelete = path.join(__dirname, "file.txt");

    // Compruebo si el fichero existe
    try {
      await fs.access(fileToDelete);
    } catch (e) {
      const error = new Error("El fichero no existe o no puedo leerlo");
      throw error;
    }

    // Borro el fichero
    await fs.unlink(fileToDelete);

    console.log("El fichero fue borrado");
  } catch (error) {
    console.error(error.message);
  }
}

main();
