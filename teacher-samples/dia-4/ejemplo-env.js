// const dotenv = require("dotenv");
// dotenv.config();
require("dotenv").config();

const cowsay = require("cowsay");

const { MYSQL_USER, MYSQL_PASS, APP_LANG } = process.env;

console.log("usuario mysql", MYSQL_USER);
console.log("pass mysql", MYSQL_PASS);
console.log("idioma", APP_LANG);

console.log(
  cowsay.say({
    text: "Buenos días",
  })
);
