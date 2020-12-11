const fs = require("fs").promises;
const path = require("path");

async function main() {
  try {
    const dir = path.join(__dirname, "docs/2020/december");

    await fs.mkdir(dir, {
      recursive: true,
    });

    console.log("Los directorios fueron creados");
  } catch (error) {
    console.error(error.message);
  }
}

main();
