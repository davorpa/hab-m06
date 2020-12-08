const fs = require("fs").promises;
const path = require("path");

async function main() {
  try {
    const dir = path.join(__dirname, "borrame");

    await fs.rmdir(dir, {
      recursive: true, // Cuidado que lo borra aunque tenga contenidos
    });

    console.log("El directorio fue borrado");
  } catch (error) {
    console.error(error.message);
  }
}

main();
