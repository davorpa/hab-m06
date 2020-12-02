const http = require("http");

let count = 1;

const handlePetition = (request, response) => {
  // leer la request
  // escribir la response

  console.log(request.url);
  response.statusCode = 200;

  if (request.url === "/noticias") {
    response.setHeader("Content-type", "text/html");
    const now = new Date();
    response.end(`<html>
      <head>
        <meta charset="utf-8" />
        <title>Noticias del día</title>
        <style>
          h1 {
            background-color: rebeccapurple;
            color: gold;
          }
        </style>
      </head>
      <body>
        <header>
          <h1>Noticias del día!!</h1>
          <p>${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}</p>
        </header>
      </body>
    
    </html>`);
  } else {
    const message = {
      message: "Ola desde node",
      petitions: count++,
      date: new Date().toISOString(),
    };

    response.setHeader("Content-type", "application/json");
    response.end(JSON.stringify(message));
  }
};

const server = http.createServer(handlePetition);
server.listen(3000, "0.0.0.0");
