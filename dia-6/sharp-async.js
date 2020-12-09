const path = require("path");
const sharp = require("sharp");

async function main() {
  try {
    const imagePath = path.join(__dirname, "photos", "12.jpg");
    const imageOutputPath = path.join(__dirname, "modificada.jpg");

    const image = sharp(imagePath);

    image.tint("rgb(255, 0, 0)");
    image.resize(600);

    await image.toFile(imageOutputPath);

    console.log("la imagen fue modificada");
  } catch (error) {
    console.error(error);
  }
}

main();
