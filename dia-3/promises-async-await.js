const fs = require("fs");

function write(file, content) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(file, content, (error) => {
      if (error)
        return reject(new Error("Hubo un error escribiendo el fichero"));
      resolve("El fichero ya está disponible");
    });
  });
}

async function main() {
  try {
    const resultado = await write(
      "hola.txt",
      `${new Date().toISOString()}: lorem ipsum dolor sit amet 😀`
    );

    console.log(resultado);
  } catch (error) {
    console.error(error.message);
  }
}

main();
