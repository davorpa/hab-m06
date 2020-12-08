const fs = require("fs").promises;
const path = require("path");

async function main() {
  try {
    const dir = path.join(__dirname, "photos");

    // Compruebo que el directorio existe y si no lanzo un error
    try {
      await fs.access(dir);
    } catch (e) {
      throw new Error("El directorio no existe");
    }

    // Leo los contenidos del directorio
    const directoryContents = await fs.readdir(dir);

    // Recorro los contenidos del directorio
    for (const entry of directoryContents) {
      // Convierto las entradas en la ruta correspondiente
      const entryPath = path.join(dir, entry);
      // Saco información de cada ruta
      const entryInfo = await fs.stat(entryPath);

      if (entryInfo.isDirectory()) {
        // Si es directorio imprimo que es un directorio
        console.log(`${entry} es un directorio`);
      } else if (entryInfo.isFile()) {
        // Si es un fichero imprimo el tamaño
        console.log(`${entry} pesa ${entryInfo.size} bytes`);
      }
    }
  } catch (error) {
    console.error(error.message);
  }
}

main();
