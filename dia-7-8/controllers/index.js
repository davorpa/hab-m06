const { html } = require("../components");

const guestbook = [
  {
    name: "Felipe",
    message: "Me mola el html que usas",
  },
  {
    name: "Lula",
    message: "Guau guau",
  },
  {
    name: "Berto",
    message: "Que web tan bonita",
  },
];

function home(request, response) {
  // Respuesta a /
  response.statusCode = 200;
  response.setHeader("Content-type", "text/html");

  const filter = request.querystring.get("filtro");

  const filteredGuestBook = filter
    ? guestbook.filter((item) =>
        item.message.toLowerCase().includes(filter.toLowerCase())
      )
    : guestbook;

  const guestBookList = filteredGuestBook.map((item) => {
    return `
      <li>
        <p>${item.message}</p>
        <p><strong>${item.name}</strong></p>
      </li>
    `;
  });

  response.end(
    html({
      title: "Bienvenidos a mi web",
      content: `
        <h2>Visitas anteriores</h2>
        <form method="GET">
          <input type="search" name="filtro" placeholder="palabra a buscar" value="${
            filter ? filter : ""
          }"/>
          <button>Filtrar</button>
          ${filter ? `<p><a href="/">Quitar filtro</a></p>` : ""}
        </form>
        <ul>
          ${guestBookList.join("")}
        </ul>

        <h2>Firma el libro de visitas</h2>
        <form method="POST" action="/guestbook">
          <fieldset>
            <label for="name">Nombre</label>
            <input type="text" name="name" id="name" />
          </fieldset>
          <fieldset>
            <label for="message">Comentario</label>
            <textarea name="message"></textarea>
          </fieldset>
          <button>Enviar</button>
        </form>
      `,
    })
  );
}

function news(request, response) {
  // Respuesta a /noticias
  response.statusCode = 200;
  response.setHeader("Content-type", "text/html");

  response.end(
    html({
      title: "Noticias del día",
      content: "<p>Hoy pasaron muchas cosas</p>",
    })
  );
}

function newmessage(request, response) {
  const body = request.body;

  // comprobar que en el body hay una propiedad name y message
  if (!body.name || !body.message) {
    // si no las hay devolver un error
    response.statusCode = 400;
    response.setHeader("Content-type", "text/html");
    response.end("Error procesando formulario");
  } else {
    // si las hay añadir el objeto al principio del guestbook
    guestbook.unshift({
      name: body.name,
      message: body.message,
    });

    // redirigir al usuario a la portada
    response.statusCode = 302;
    response.setHeader("Location", "/");
    response.end();
  }
}

module.exports = {
  home,
  news,
  newmessage,
};
