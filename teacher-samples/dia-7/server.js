require("dotenv").config();
const http = require("http");

const { html } = require("./components");

// Creo un servidor HTTP
const server = http.createServer();

// Configuro una función que se ejecutará en cada petición
server.on("request", (request, response) => {
  const url = request.url;
  const method = request.method;
  // const headers = request.headers;

  if (url === "/" && method === "GET") {
    // Respuesta a /
    response.statusCode = 200;
    response.setHeader("Content-type", "text/html");

    response.end(
      html({
        title: "Bienvenidos a mi web",
        content: "<p>Eres mi visitante favorito</p>",
      })
    );
  } else if (url === "/noticias" && method === "GET") {
    // Respuesta a /noticias
    response.statusCode = 200;
    response.setHeader("Content-type", "text/html");

    response.end(
      html({
        title: "Noticias del día",
        content: "<p>Hoy pasaron muchas cosas</p>",
      })
    );
  } else if (url === "/css/style.css" && method === "GET") {
    // Respuesta a /css/style.css

    response.statusCode = 200;
    response.setHeader("Content-type", "text/css");

    response.end(`
      body {
        font-family: sans-serif;
      }

      h1 {
        background-color: rebeccapurple;
        color: gold;
      }
    `);
  } else {
    // Respuesta cuando no hay otra respuesta
    response.statusCode = 404;
    response.setHeader("Content-type", "text/html");
    response.end("Not found");
  }
});

// Pongo el servidor a escuchar
const port = process.env.PORT;
server.listen(port, () => {
  console.log(`Servidor funcionando en http://localhost:${port}`);
});
