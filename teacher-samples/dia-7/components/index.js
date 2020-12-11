const html = ({ title, content }) => {
  return `
  <!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>

  <link rel="stylesheet" href="/css/style.css" />
</head>
<body>
  <header>
    <h1>${title}</h1>
    <nav>
      <ul>
        <li><a href="/">Portada</a></li>
        <li><a href="/noticias">Noticias</a></li>
      </ul>
    </nav>
  </header>
  <main>
    ${content}
  </main>
  <footer>
    <p>(c) 2020, Hackaboss</p>
  </footer>
</body>
</html>
  `;
};

module.exports = {
  html,
};
