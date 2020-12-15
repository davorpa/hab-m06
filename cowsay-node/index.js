// must do this initialization *before* other requires in order to work
if (process.argv.includes("--debug")) {
  // enable all debug channels
  // eslint-disable-next-line global-require
  require("debug").enable("myapp:*");
  // eslint-disable-next-line global-require
  require("dotenv").config({
    debug: true,
  });
} else {
  /* eslint-disable global-require */
  require("dotenv").config();
}
const debug = require("debug")("myapp:main");
const cowsay = require("cowsay");

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

function printSay() {
  // randomize params
  const thinking = Math.floor(Math.random() * 50) > 25;
  // build message
  const message = cowsay[thinking ? "think" : "say"]({
    text: `Hola amig@s del Javascript y Node ^·^,`,
  });
  // eslint-disable-next-line no-console
  console.log(message);
}

//------------------------------------------------------------------------------
// Execution
//------------------------------------------------------------------------------

debug.enabled && debug("Booting %o", module.path);

(function main() {
  printSay();
})();
