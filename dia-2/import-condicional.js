const flag = false;

let imported;

if (flag) {
  imported = require("./lib/module");
} else {
  imported = require("./lib/segundo");
}

imported.hello();
