const fs = require("fs");
const path = require("path");

const file = "data.json";

const content = {
  date: "12/8/2020",
  userName: "berto",
};

// fs.writeFile(path, contenido, callback)
fs.writeFile(path.join(__dirname, file), JSON.stringify(content), (error) => {
  if (error) {
    console.error("el fichero no pudo ser escrito");
  } else {
    console.log("el fichero fué escrito correctamente");
  }
});
