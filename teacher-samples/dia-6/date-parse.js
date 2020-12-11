const { parse } = require("date-fns");
const { es } = require("date-fns/locale");

const fechaDifusa = "3/diciembre/94 7:45PM";

const jsDate = parse(fechaDifusa, "d/MMMM/yy h:ma", new Date(), {
  locale: es,
});

console.log(jsDate.toLocaleDateString());
console.log(jsDate.toLocaleTimeString());
