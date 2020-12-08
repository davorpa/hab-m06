const fs = require("fs");
const path = require("path");

const file = "data.json";

const content = {
  date: "12/8/2020",
  userName: "lula",
};

// fs.writeFile(path, contenido, callback)
try {
  fs.writeFileSync(path.join(__dirname, file), JSON.stringify(content));
} catch (error) {
  console.error(error.message);
}
