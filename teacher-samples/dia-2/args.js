const args = process.argv.slice(2);

console.log(args);

if (args[0] === "-h") {
  const now = new Date();

  if (args[1] === "-iso") {
    console.log(now.toISOString());
  } else {
    console.log(now.toLocaleDateString());
  }
} else {
  console.log("ola");
}
