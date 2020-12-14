require("dotenv").config();
const express = require("express");
const path = require("path");
const fs = require("fs/promises");
const bodyParser = require("body-parser");
const uuid = require("uuid");

const { PORT } = process.env;

const app = express();

// Middlewares
app.use(bodyParser.json());

const guestbook = path.join(__dirname, "guestbook.json");

/*
  GET - /guestbook
        /guestbook?filtro=valor
  - debe listar todos los contenidos del libro de visitas ✅
  - y si se pasa un parámetro de filtro por **querystring** 
    solo debe mostrar los que coincidan ✅
*/
app.get("/guestbook", async (request, response) => {
  try {
    const { filter } = request.query;

    let guestbookObject;

    try {
      const guestbookData = await fs.readFile(guestbook, "utf-8");
      guestbookObject = guestbookObject = JSON.parse(guestbookData);
    } catch (e) {
      throw new Error("Imposible leer los datos del guestbook");
    }

    // let guestbookList;

    // if (filter) {
    //   guestbookList = guestbookObject.filter((item) => {
    //     return (
    //       item.message.toLowerCase().includes(filter.toLowerCase()) ||
    //       item.author.toLowerCase().includes(filter.toLowerCase())
    //     );
    //   });
    // } else {
    //   guestbookList = guestbookObject;
    // }

    const guestbookList = filter
      ? guestbookObject.filter((item) => {
          return (
            item.message.toLowerCase().includes(filter.toLowerCase()) ||
            item.author.toLowerCase().includes(filter.toLowerCase())
          );
        })
      : guestbookObject;

    response.send(guestbookList);
  } catch (error) {
    response.status(500).send({
      error: error.message,
    });
  }
});

/*
  GET - /guestbook/[id]
        /guestbook/e0145dde-1317-4a74-9931-80bcffd433ce
        /guestbook/18e41323-6296-437f-a0dc-4c0dfa55eefe
        /guestbook/97a95684-fe01-4bd4-989c-1abd1865838b
  - debe mostrar sólo la entrada con el **parámetro** [id] de la url ✅
*/

app.get("/guestbook/:id", async (request, response) => {
  try {
    const { id } = request.params; // siempre va a ser un string

    const guestbookData = await fs.readFile(guestbook, "utf-8");
    const guestbookObject = JSON.parse(guestbookData);

    const item = guestbookObject.find((item) => {
      return item.id === id;
    });

    if (!item) {
      const error = new Error("Entrada no existente");
      error.httpStatus = 404;
      throw error;
    }

    response.send(item);
  } catch (error) {
    response.status(error.httpStatus || 500).send({
      error: error.message,
    });
  }
});

/*
  POST - /guestbook
  - debe añadir al principio del libro de visitas los datos enviados en el **body**
  - debe devolver un mensaje informando si tuvo éxito o no
*/
app.post("/guestbook", async (request, response) => {
  try {
    // Sacar message y author del body
    const { message, author } = request.body;

    // Si message o author están vacíos lanzamos un error
    if (!message || !author) {
      const error = new Error("Faltan campos");
      error.httpStatus = 400;
      throw error;
    }
    // Leemos el guestbook actual y convertimos a array de js con JSON.parse
    const guestbookData = await fs.readFile(guestbook, "utf-8");
    const guestbookObject = JSON.parse(guestbookData);

    // Añadimos lo que llegó por body al principio del guestbook con un id único
    guestbookObject.unshift({
      message,
      author,
      id: uuid.v4(),
    });

    // Guardamos el guestbook en el fichero.json de nuevo
    await fs.writeFile(guestbook, JSON.stringify(guestbookObject));

    // Devolvemos información del éxito del proceso
    response.send({
      message: "Nueva entrada guardada correctamente",
    });
  } catch (error) {
    response.status(error.httpStatus || 500).send({
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`El servidor está funcionando en http://localhost:${PORT}`);
});
