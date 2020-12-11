const sharp = require("sharp");

// directamente con la ruta en texto (no recomendado)
const image = sharp("./photos/14.jpg");

// modifico la imagen
image.grayscale();
image.blur(3);
image.resize(400);

// guardo la imagen
image
  .toFile("./editada.jpg")
  .then(() => console.log("la imagen está modificada"))
  .catch((error) => console.error(error));
