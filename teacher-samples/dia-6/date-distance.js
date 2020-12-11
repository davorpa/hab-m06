const {
  formatDistance,
  add,
  differenceInBusinessDays,
  isFriday,
} = require("date-fns");
const { es } = require("date-fns/locale");

const date1 = new Date(2020, 11, 9, 19, 30);
const date2 = new Date();

// Distancia entre las dos fechas en formato "humano"
const distance = formatDistance(date1, date2, { locale: es });

console.log(`hace ${distance}`);

const future = add(date2, {
  months: 1,
  days: 3,
});

// Un mes y 3 días en el futuro
console.log(future);

const difference = differenceInBusinessDays(future, date1);

console.log(difference);

console.log(isFriday(future));
