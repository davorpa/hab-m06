const path = require("path");
const fs = require("fs").promises;
const sharp = require("sharp");
// const exparser = require("exif-parser");
const ExifImage = require("exif").ExifImage;

async function main() {
  try {
    const imagePath = path.join(__dirname, "photos", "21.jpg");

    const buffer = await fs.readFile(imagePath);

    const image = sharp(buffer);

    const metadata = await image.metadata();
    console.log(metadata);

    new ExifImage(buffer, function (error, exifData) {
      if (error) console.log("Error: " + error.message);
      else console.log(exifData); // Do something with your data!
    });

    // const exif = exparser.create(buffer);
    // console.log(exif.parse());

    // console.log(
    //   `la imagen tiene ${metadata.width}px de ancho y ${metadata.height} de alto`
    // );
  } catch (error) {
    console.error(error);
  }
}

main();
