const path = require("path");
const fs = require("fs").promises;

async function loadFile(filePath) {
  const data = await fs.readFile(filePath, "utf-8");
  return data;
}

async function main() {
  try {
    let content;
    let data;

    try {
      content = await loadFile(path.join(__dirname, "ddata.json"));
    } catch (e) {
      const error = new Error("No se pudo leer el fichero");
      throw error;
    }

    try {
      data = JSON.parse(content);
    } catch (e) {
      const error = new Error("Error convirtiendo JSON a objeto");
      throw error;
    }

    console.log(data.userName);
  } catch (error) {
    console.error(error.message);
  }
}

main();

// Las promesas también se pueden consumir de esta forma:
//
// fs.writeFile(path.join(__dirname, "hola.txt"), "Ola amigas!!!")
//   .then(() => {
//     console.log("el fichero fué escrito");
//   })
//   .catch((error) => {
//     console.error(error.message);
//   });
