const path = require("path");
const fs = require("fs").promises;
const sharp = require("sharp");

async function main() {
  try {
    const imagePath = path.join(__dirname, "photos", "21.jpg");

    // Abro la imagen en un buffer
    const buffer = await fs.readFile(imagePath);

    // Cargo la imagen en un buffer
    const image = sharp(buffer);

    // Extraigo los metadatos
    const metadata = await image.metadata();
    console.log(metadata);
  } catch (error) {
    console.error(error);
  }
}

main();
