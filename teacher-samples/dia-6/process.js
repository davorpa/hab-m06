// PENDIENTE: Reciba por argumento dos directorios
// Coja las imagenes del primer directorio
// Genere una miniatura
// Escriba en el segundo directorio

const sharp = require("sharp");
const path = require("path");
const fs = require("fs").promises;

async function process() {
  try {
    // PENDIENTE: comprobar que el directorio de originales exista
    const originals = path.join(__dirname, "originals");
    const destination = path.join(__dirname, "miniaturas");
    const logo = path.join(__dirname, "photos/logo.png");

    // PENDIENTE: Garantizar que el directorio de destino existe
    // Recordar a berto que hable de fs-extra (un módulo de npm)

    // Leo el directorio de originals
    const images = await fs.readdir(originals);

    // PENDIENTE: filtrar las imagenes leidas para que solo queden
    // las que tienen una extensión soportada (jpg, jpeg, png, webp, tiff, svg)

    for (const image of images) {
      console.log(`Procesando ${image}`);
      const imagePath = path.join(originals, image);

      const imageSharp = sharp(imagePath);

      imageSharp.resize(800);
      imageSharp.sharpen();
      imageSharp.grayscale();

      imageSharp.composite([
        {
          input: logo,
          gravity: "southeast",
        },
      ]);

      const outputPath = path.join(destination, `miniatura_${image}`);

      await imageSharp.toFile(outputPath);
      console.log(`Imagen guardada`);
    }
  } catch (error) {
    console.error(error);
  }
}

process();
