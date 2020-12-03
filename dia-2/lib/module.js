function hello() {
  console.log("ola desde un módulo externo");
}

function sum(a, b) {
  return a + b;
}

const PI = 3.14159;

module.exports = {
  hello: hello,
  sum: sum,
  PI: PI,
};
