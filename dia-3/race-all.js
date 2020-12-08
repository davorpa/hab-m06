const p1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("resultado 1"), 1000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("resultado 2"), 2000);
});

Promise.all([p1, p2]).then((resultados) => {
  console.log(resultados);
});

// Promise.race([p1, p2])
//   .then((result) => console.log(result))
//   .catch((error) => console.error(error));
