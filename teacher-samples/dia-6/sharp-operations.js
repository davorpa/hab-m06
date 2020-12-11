const path = require("path");
const sharp = require("sharp");

async function main() {
  try {
    const imagePath = path.join(__dirname, "photos", "20.jpg");
    const imageOutputPath = path.join(__dirname, "lula.png");

    const image = sharp(imagePath);

    image.resize(400, 400, {
      fit: "cover",
    });

    // image.rotate(90);
    image.trim();
    image.normalise(true);
    image.extractChannel("green");

    image.toFormat("png");

    await image.toFile(imageOutputPath);

    console.log("la imagen fue modificada");
  } catch (error) {
    console.error(error);
  }
}

main();
