# Express

- El módulo express
- Middlewares
- Rutas
- Request y response

## El módulo express

El módulo nativo `http` de Node se usa para crear servidores web y es muy potente pero no destaca por su simplicidad para realizar tareas básicas como establecer rutas y dar respuestas de un tipo o otro. Por esta razón vamos a usar a partir de ahora para crear nuestros servidores web el módulo externo `express` que nos ayudará a realizar esas tareas de forma muy simple.

El módulo `express` es una extensión del módulo `http` por lo que realmente cuando lo usamos, por detrás `express` está usando el módulo `http` para realizar las acciones.

Instalamos express usando:

`npm install express --save`

Ejemplo de servidor web en express:

```js
const express = require('express');
const app = express();

app.use(function(request, response) {
	response.send('Ola amigas!');
});

app.listen(3000);
```

Como vemos es muy simple: requerimos el módulo express y creamos una variable `app` que representará nuestro servidor web y usaremos los métodos de esa `app` para crear middlewares, rutas e iniciar el servidor para que empiece a escuchar peticiones HTTP.

### Middlewares

Para entender express es imprescindible entender el concepto de _middleware_. 

Como aprendimos en el módulo `http` cuando el servidor recibe una _request_ (petición) esta pasa por una función que genera una _response_ (respuesta):

`request -> request handler function -> response`

Esto cambia ligeramente en `express`. Cuando se recibe una _request_ esta pasa por un array de funciones por orden y finalmente da una respuesta. Cada elemento de ese array de funciones se llama _middleware_ y este aspecto de express es lo que lo hace tan potente y versátil:

`request -> middleware1 -> middleware2 -> ... -> response`

Ese array de funciones _middleware_ lo llenamos usando funciones creadas por nosotros mismos o bien usando módulos _middleware_ instalables mediante npm, veremos los dos casos. 

**Estos _middlewares_ se ejecutarán en el orden en el que estén específicados en el código**

Para que sirven estos _middlewares_? Sirven para lo que definamos nosotros en las funciones que se ejecutan. Por ejemplo podemos crear un middleware que lleve un registro de todas las peticiones realizadas, o otro que compruebe si existe determinado header (y devuelva un error si no existe), lo que sea...

Cada middleware puede modificar la request o la response e incluso enviar una respuesta y de esa forma impedir que no se ejecuten los siguientes middlewares.

Para asignar middlewares a la app usamos `app.use(<function>)`, la función que le pasamos recibe 3 parámetros por defecto: request, response y next. Los dos primeros ya los conocemos y el último es una función que al ejecutarla nos pasa al siguiente middleware definidio (si ese middleware no genera una respuesta).

```js
const express = require('express');
const app = express();

app.use(function(request, response, next) {
	console.log(`soy el primer middleware! la ruta solicitada es ${request.url}`);
	next(); //pasamos al siguiente middleware
});

app.use(function(request,response, next) {
  if (request.headers.authorization === "loremipsum") {
    next();
  } else {
    response.statusCode = 401;
    response.end("No se puede pasar");
  }
});

app.use(function(request, response) {
  response.statusCode = 200;
  response.end("Llegaste al final!!");
});

app.listen(3000);
```

Como se comentó anteriormente también hay módulos instalables mediante npm que se pueden usar como middleware, veremos alguno de ellos en los próximos días pero podemos hacer un ejemplo con el módulo `morgan` que se trata de un "logueador" de peticiones que mostrará de forma automática en la consola información de cada petición sin que nosotros tengamos que hacerlo explícitamente. Para instalarlo:

`npm install morgan --save`

y para usarlo:

```js
const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan());

app.use(function(request, response) {
	response.statusCode = 200;
	response.end('Mira la consola!!');
});

app.listen(3000);
```

Otro middleware muy común que en este caso viene incluído con express es el que permite servir un directorio del disco como contenido estático, o sea, enviando los ficheros reales si coinciden con la ruta solicitada (como hace browser-sync):

```js
const express = require('express');
const app = express();
const path = require('path');

const staticFiles = path.resolve(__dirname, 'www');

app.use(express.static(staticFiles));

app.use(function(request, response) {
	response.statusCode = 200;
	response.end('Mira la consola!!');
});

app.listen(3000);
```

Después de configurar este middleware si tenemos un fichero llamado `image.png` en el subdirectorio `www` del directorio donde se encuentra el fichero donde programamos el servidor web este estará accesible usando la url: `http://localhost:3000/image.png` sin tener que configurar nada más.

### Rutas

Las rutas son unos middlewares especiales que sólo responden a peticiones HTTP realizadas a determinada url y con un determinado método y normalmente deberían cerrar la respuesta enviando algo al cliente (con `response.end`).

Por ejemplo, queremos configurar un servidor web que tenga una página principal en la ruta `/`, una página de contacto en la ruta `/contact` y el resto de las rutas queremos que den un 404.

```js
const express = require('express');
const app = express();

app.get('/', function(request, response) {
	response.statusCode = 200;
	response.end('Portada!');
});

app.get('/contact', function(request, response) {
	response.statusCode = 200;
	response.end('Contacto');
});

//Sólo llegará a ejecutar el siguiente middleware si no entró en ninguna de las rutas anteriores
app.use(function(request, response) {
	response.statusCode = 404;
	response.end('Not found :(');
});

app.listen(3000);
```

#### Parámetros de rutas

Otra característica importante de las rutas es que se pueden definir rutas variables definiendo parte de las mismas como parámetros, por ejemplo en express se puede definir una ruta así:

`app.get('/news/:year/:month', routeHandlerFunction)`

vemos que dentro de la ruta definimos dos palabras con `:` antes que les vamos a llamar parámetros de ruta: 

- `:year`
- `:month`

En esta ruta entrarán las peticiones a las urls del tipo (entre otras):

- /news/2020/3
- /news/2020/abril

En general en cada uno de eses parámetros puede ser sustituído por cualquier cadena.

Para que sirven estos parámetros? Pues son como una querystring más integrada dentro de la ruta y podemos usarlos en la función que maneja la ruta de esta forma:

```js
app.get('/users/:userId/fotos/:category', (req, res) => {
	console.log(req.params);
});
```

ese `req.params` será un objeto que contendrá los parámetros reales de la url, por ejemplo en ese caso si hacemos una llamada a la url `/users/34/fotos/naturaleza`, el objeto `req.params` será así:

```js
{
	userId: '3',
	category: 'naturaleza'
}
```

y podremos usar eses parámetros para dar una respuesta.

### Request y response

Como dijimos al principio express trabaja sobre el módulo nativo de node http extendiéndolo con funcionalidades como middlewares o rutas. En los dos casos nos permite ejecutar una o varias funciones que procesan las peticiones y pueden enviar una respuesta. A todas esas funciones se le pasan dos argumentos que ya conocemos del módulo http: request y response que son dos objetos que representan la petición y la respuesta HTTP.

En los ejemplos anteriores usamos unas propiedades y métodos de eses objetos que ya conocíamos del módulo http: `request.url, request.headers, response.statusCode, response.end, ...`. 

Express también extiende estos objetos de request y response añadiéndoles nuevas propiedades y métodos para darnos información y hacernos la vida más fácil.

Request:

- `request.ip`: nos da la dirección ip desde donde se originó la petición
- `request.path`: nos da la ruta de la url sin la querystring (si la hay)
- `request.query`: un objeto que representa el querystring
- `request.body`: un objeto que representa el body, por defecto vacío pero veremos en las próximas lecciones como funciona.

Response:

- `response.end()`: este método permite acabar una respuesta sin contenido.
- `response.status(code)`: establece el estado HTTP de la respuesta (200, 404, etc...)
- `response.send(content)`: acaba la respuesta enviando el contenido.
- `response.sendFile(path)`: envía el contenido del fichero en ese `path` como respuesta.
- `response.set(header, value)`: establece un header de la respuesta, si le pasamos un objeto establecerá todos los headers especificados en el objeto.