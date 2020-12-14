require("dotenv").config();
const express = require("express");
const path = require("path");
const fs = require("fs/promises");

const { PORT } = process.env;

const app = express();

const guestbook = path.join(__dirname, "guestbook.json");

/*
  GET - /guestbook
        /guestbook?filtro=valor
  - debe listar todos los contenidos del libro de visitas ✅
  - y si se pasa un parámetro de filtro por **querystring** solo debe mostrar los que coincidan
*/
app.get("/guestbook", async (request, response) => {
  try {
    const guestbookData = await fs.readFile(guestbook, "utf-8");
    const guestbookObject = JSON.parse(guestbookData);

    response.send(guestbookObject);
  } catch (error) {
    response.status(500);
    response.send({
      error: error.message,
    });
  }
});

/*
  GET - /guestbook/[id]
        /guestbook/e0145dde-1317-4a74-9931-80bcffd433ce
  - debe mostrar sólo la entrada con el **parámetro** [id] de la url
*/

app.get("/---algo---", (request, response) => {
  response.send({
    message: "Esta petición debería devolver un contenido",
  });
});

/*
  POST - /guestbook
  - debe añadir al principio del libro de visitas los datos enviados en el **body**
  - debe devolver un mensaje informando si tuvo éxito o no
*/
app.post("/guestbook", (request, response) => {
  response.send({
    message:
      "Esta petición debería meter algo de contenido en la bbdd (por ejemplo)",
  });
});

app.listen(PORT, () => {
  console.log(`El servidor está funcionando en http://localhost:${PORT}`);
});
