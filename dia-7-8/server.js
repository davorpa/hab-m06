require("dotenv").config();
const http = require("http");
const path = require("path");
const fs = require("fs/promises");
const mime = require("mime-types");
const querystring = require("querystring");

const { home, news, newmessage } = require("./controllers");

// Creo un servidor HTTP
const server = http.createServer();

// Path de archivos estáticos
const staticPath = path.join(__dirname, "static");

// Extraigo el port y host del process.env
const { PORT, HOST } = process.env;

// Construyo la url base del sitio que se necesita
// para analizar la url de la petición
const baseURL = `${HOST}:${PORT}`;

// Esta función analiza el body de una petición y lo devuelve
const bodyParser = (request) => {
  return new Promise((resolve) => {
    let body = [];
    request.on("data", (part) => body.push(part));
    request.on("end", () => {
      body = Buffer.concat(body).toString();
      resolve(querystring.parse(body));
    });
  });
};

// Configuro una función que se ejecutará en cada petición
server.on("request", async (request, response) => {
  const urlInfo = new URL(request.url, baseURL);
  const url = urlInfo.pathname;
  const querystring = urlInfo.searchParams;

  const body = await bodyParser(request);

  request.querystring = querystring;
  request.body = body;

  const method = request.method;
  // const headers = request.headers;

  if (url === "/" && method === "GET") {
    home(request, response);
  } else if (url === "/noticias" && method === "GET") {
    news(request, response);
  } else if (url === "/guestbook" && method === "POST") {
    newmessage(request, response);
  } else {
    //Primero mira a ver si hay algún archivo en disco que coincida con la url
    try {
      // staticPath + url
      // Nota: esto no es muy seguro para usar en el mundo real
      // es una demo para ver como funciona
      const resourcePath = path.join(staticPath, url);

      const data = await fs.readFile(resourcePath);

      response.statusCode = 200;
      const type = mime.lookup(resourcePath);
      response.setHeader("Content-type", type);

      response.end(data);
    } catch (error) {
      // Respuesta cuando no hay otra respuesta
      response.statusCode = 404;
      response.setHeader("Content-type", "text/html");
      response.end(
        "<p>Not found</p><p><a href='/'>Volver a la portada</a></p>"
      );
    }
  }
});

// Pongo el servidor a escuchar
server.listen(PORT, () => {
  console.log(`Servidor funcionando en ${baseURL}`);
});
