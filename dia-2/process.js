let count = 0;
setInterval(() => {
  count++;
  console.log(count);

  if (count === 5) {
    conso1e.log("llegué a 5");
  }
}, 500);

process.on("uncaughtException", (error) => {
  console.log("Ocurrió un error");
  console.log(error.message);
});
