const { sample, sampleSize, isDate } = require("lodash");

const array = ["lunes", "martes", "miércoles", "jueves", "viernes"];

console.log(sample(array));
console.log(sampleSize(array, 3));

console.log(isDate(33));
console.log(isDate(new Date()));
