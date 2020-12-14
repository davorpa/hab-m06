/*
  Hacer un script de node que al ejecutarlo responda con el número de minutos
  que pasaron desde la última vez que se ejecutó o con un mensaje que indique que
  es la primera vez que se ejecuta
*/

/*
  - crear en el mismo directorio un archivo llamado memoria.json con información de la última ejecución
  - si al ejecutarlo no existe asumo que es la primera vez
  - si existe leo la información de la última ejecución y la muestro
  - en cualquiera de los dos casos anteriores escribo el archivo
*/

const path = require("path");
const fs = require("fs/promises");
const { formatDistanceToNow } = require("date-fns");
const { es } = require("date-fns/locale");

const memoria = path.join(__dirname, "memoria.json");

async function main() {
  try {
    // Intentar leer el archivo que guarda la información de última ejecución
    try {
      await fs.access(memoria);
    } catch (e) {
      throw new Error("Es la primera vez que me ejecutan");
    }

    // Leer el archivo de memoria
    let executionData;

    try {
      executionData = await fs.readFile(memoria, "utf-8");
    } catch (e) {
      throw new Error(
        "Se que me ejecutaron alguna vez pero no recuerdo cuando"
      );
    }

    // Convertir la cadena de texto a JSON
    const executionObject = JSON.parse(executionData);

    // Extraer la información de última ejecución
    const lastExecution = new Date(executionObject.lastExecution);

    // Calcular la distancia hasta el momento actual
    const distance = formatDistanceToNow(lastExecution, { locale: es });

    // Mostrar la información en consola
    console.log(`La última vez que me ejecutaron fue hace ${distance}`);
  } catch (error) {
    // Mostrar que es la primera vez que se ejecuta
    console.error(error.message);
  } finally {
    // Sacar la fecha actual
    const now = new Date();

    // Crear un objeto con esa información
    const lastExecutionInfo = {
      lastExecution: now.toISOString(),
    };

    // Guardar el objeto transformado a cadena de texto en el archivo de memoria.json
    await fs.writeFile(memoria, JSON.stringify(lastExecutionInfo));
  }
}

main();
