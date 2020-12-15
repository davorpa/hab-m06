// Ejercicio 2:

/*
  Modificar el código del fichero ./fs-methods/fs-readdir.js para que:
  - Lea recursivamente el contenido de subdirectorios
  - Permita que el directorio inicial se pase como argumento del programa
  p.ej:
  node readdir.js ../uploads

  Esto debería leer el directorio uploads en el directorio anterior y
  mostrar el listado de contenidos indicando en el caso de que sea un fichero
  su tamaño y fecha de creación. Esto debe hacerlo recursivamente para 
  todos los posibles subdirectorios del directorio inicial.
*/

const fs = require("fs").promises;
const path = require("path");

async function readDir(dir) {
  // Leo los contenidos del directorio
  const list = await fs.readdir(dir);

  // Convierto el array de contenidos en un array de elementos con
  // la información requerida (tamaño del fichero + fecha de creación)
  const listWithInfo = list.map(async (item) => {
    // Creo la ruta completa del elemento
    const itemPath = path.join(dir, item);
    // Saco información de la ruta
    const itemInfo = await fs.stat(itemPath);

    // Si la ruta es un directorio devuelvo un objeto indicando
    // que es un directorio y sus contenidos
    if (itemInfo.isDirectory()) {
      return {
        directory: itemPath,
        contents: await readDir(itemPath), //le los contendios llamando recursivamente a esta función
      };
    }

    // Si es un fichero devuelvo información del fichero
    return {
      file: itemPath,
      size: itemInfo.size,
      createdAt: itemInfo.birthtime,
    };
  });

  return Promise.all(listWithInfo);
}

function prettyPrint(tree) {
  for (const item of tree) {
    if (item.file) {
      console.log(
        `La ruta ${item.file} tiene un tamaño de ${item.size}bytes y fue creada en ${item.createdAt}`
      );
    } else {
      console.log("---");
      console.log(`La ruta ${item.directory} es un directorio`);
      prettyPrint(item.contents);
    }
  }
}

async function main() {
  try {
    // Leo el argumento con el que se ejecuta el programa
    const dir = process.argv[2];
    // Lo convierto a una ruta
    const initPath = path.join(__dirname, dir);

    // Compruebo que la ruta inicial existe o doy un error
    try {
      await fs.access(initPath);
    } catch (error) {
      throw new Error("El directorio inicial no existe");
    }

    // Llamo a la función que leera recursivamente la ruta inicial
    const fileTree = await readDir(initPath);

    prettyPrint(fileTree);
  } catch (error) {
    console.error(error.message);
  }
}

main();
