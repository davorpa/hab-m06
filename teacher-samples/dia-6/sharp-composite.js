const path = require("path");
const sharp = require("sharp");

async function main() {
  try {
    const imagePath = path.join(__dirname, "photos", "20.jpg");
    const imageOutputPath = path.join(__dirname, "lula-logo.jpg");
    const logo = path.join(__dirname, "photos", "logosvg.svg");

    const image = sharp(imagePath);

    image.resize(1000, 1000);

    image.composite([
      {
        input: logo,
        gravity: "southeast",
      },
    ]);

    await image.toFile(imageOutputPath);
  } catch (error) {
    console.error(error);
  }
}

main();
