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

(function main() {
  printSay();
})();
