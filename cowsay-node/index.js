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

function parseIntGreatherThan(value, min, field) {
  // parse
  const n = parseInt(value, 10);
  // validate
  if (Number.isNaN(n)) {
    throw new TypeError(`Numeric value expected at ${field}. ${value}`);
  } else if (n < min) {
    throw new RangeError(`Number > ${min} expected at ${field}. ${n}`);
  }
  return n;
}

function parseConfig() {
  debug.enabled && debug("Parsing config using %o", "{ENVVARS}");
  let { MESSAGING_INTERVAL: interval, MESSAGING_MAX_COUNT: messages } = process.env;
  // validate & defaults
  interval = interval !== undefined ? parseIntGreatherThan(interval, 0, "MESSAGING_INTERVAL") : 0;
  messages = messages !== undefined ? parseIntGreatherThan(messages, 1, "MESSAGING_MAX_COUNT") : 1;
  // to object
  return {
    interval,
    messages,
  };
}

function printSay(n) {
  // randomize params
  const thinking = Math.floor(Math.random() * 50) > 25;
  // build message
  const text =
    n === undefined ? `Hola amig@s del Javascript y Node ^·^,` : `Hola ${n} amig@s del Javascript y Node ^·^,`;
  const message = cowsay[thinking ? "think" : "say"]({
    text,
  });
  // eslint-disable-next-line no-console
  console.log(message);
}

//------------------------------------------------------------------------------
// Execution
//------------------------------------------------------------------------------

debug.enabled && debug("Booting %o", module.path);

(function main() {
  // configure
  const { messages, interval } = parseConfig();

  // logic handle using config
  if (messages === 1) {
    debug.enabled && debug("Handling single message");
    printSay();
  } else if (interval > 0 && messages > 1) {
    debug.enabled && debug("Handling onTicked(messages=%o,interval=%o)", messages, interval);
    let n = 0;
    const timer = setInterval(() => {
      n += 1;
      debug.enabled && debug("Handling onTicked-%o of (messages=%o,interval=%o)", n, messages, interval);
      printSay(n);
      n === messages && clearInterval(timer);
    }, interval);
  } else {
    debug.enabled && debug("Handling sequencial(messages=%o)", messages);
    for (let i = 1; i <= messages; i++) {
      debug.enabled && debug("Handling sequencial-%o of (messages=%o)", i, messages, interval);
      printSay(i);
    }
  }
})();
