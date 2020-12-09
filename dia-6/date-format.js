const { format } = require("date-fns");
const { es } = require("date-fns/locale");

// 2020-12-09T17:45:54.012Z

const now = new Date();

// 9-12-2020
const nowFormatted = format(now, "dd-MM-y");
console.log(nowFormatted);

// mércores, 9 de decembro de 2020
const nowFormattedAdvanced = format(now, "EEEE, d 'de' MMMM 'de' y (G)", {
  locale: es,
});
console.log(nowFormattedAdvanced);
