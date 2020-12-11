# Validación de datos

Uno de las tareas más frecuentes a la hora de realizar aplicaciones web es la validación de inputs de usuario.

Los usuarios mandan datos al servidor como ya vimos de diferentes formas:

- Mediante el querystring de las urls
- Mediante el body de las peticiones

Nosotros podemos consumir esos datos de forma fácil en las funciones que gestionan nuestras rutas y middlewares.

En caso de los datos que llegan por querystring podemos acceder a los datos usando la propiedad `.query` del objeto que representa a la request disponible:

```js
// por ejemplo, la url /search?q=noticias&since=2010

app.get('search', (req, res) => {
	console.log(req.query);
	/*
		el console log anterior nos daría:
		
		{
			q: 'noticias',
			since: '2010'
		}
	*/
});
```

En caso de los datos que llegan en el body de las peticiones (por ejemplo, en las peticiones con el método post) no es tan sencillo ya que por la naturaleza de este tipo de peticiones es más complicado procesar ese body y por lo tanto tenemos que usar un middleware específico que nos ayude a procesarlas.

En caso de peticiones con body y que lleven una cabecera de tipo:

- `Content-type: application/json`: el body tendrá formato similar a JSON y son las peticiones más habituales que se harán desde el frontend usando `window.fetch` o similar.
- `Content-Type: application/x-www-form-urlencoded`: el body tendrá formato similar al querystring y serán las peticiones típicas que se harán desde formularios HTML simples.

En los dos casos anteriores necesitamos usar el módulo `body-parser` que se instala usando `npm install body-parser --save` y configuramos de esta forma:

```js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// procesa body en json
app.use(bodyParser.json()); 

// procesa body x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true})); 

app.post('/', (req, res) => {
	console.log(req.body);
	
		/*
		el console log anterior nos daría un objeto con los datos que se envíen desde el cliente, por ejemplo:
	
		{
			email: 'email@dominio.com',
			password: '123456'
		}
	*/
	
});

app.listen(3000);
```

En ambos casos en las funciones que gestionan nuestras rutas o middlewares tendremos el objeto `req.query` o `req.body` que representará los datos enviados desde el cliente.

En caso de que queramos subir ficheros se enviarán usando una pecitión con la cabecera `Content-Type: multipart/form-data; (...)` y con el body en un formato especial. En estos casos usaremos el middleware `express-fileupload` usando: 

```
...
const fileUpload = require('express-fileupload');

app.use(fileUpload());
...
```

En este caso los campos que se envíen que no sean ficheros estarán disponibles igualmente en `req.body` y los ficheros estarán disponibles en el objeto `req.files`. [Ver ejemplo](https://gitlab.com/blueoceanstart/hack-a-bos/jsb05co/mod5-backend/-/blob/master/ejercicio-diario-viajes/controllers/diary.js#L42).

Estes datos que se envían desde el cliente deberemos validarlos siempre antes de trabajar con ellos, por ejemplo: comprobar que el valor del campo email es efectivamente un email, que la password no sea menor de 4 caracteres o que si recibimos un campo que represente un año sea numérico.

El proceso es sencillo, cuando recibimos datos comprobamos que todos los valores se ajustan a unos criterios y si es así seguimos ejecutando la función correspondiente y si no devolvemos un error al usuario.

Podemos realizar la validación de esos datos manualmente usando (múltiples) condicionales de Javascript pero esa tarea puede ser tediosa para validaciones complejas.

## Joi

Vamos a usar el módulo `joi` para realizar la validación de datos. Este es un módulo muy extenso y complejo que permite validar cualquier tipo de datos.

Instalamos joi así:

`npm install @hapi/joi --save`

y lo importamos en nuestro código de la forma habitual:

`const Joi = require('@hapi/joi');`

El funcionamiento de Joi es muy simple, primero creamos un _schema_ o patrón y le pasamos valores para comprobar que se ajustan a ese patrón.

El ejemplo más básico sería un _schema_ que valida cualquier cosa:

```js
const Joi = require('@hapi/joi');

const schema = Joi.any(); 

const value = 'Lorem ipsum';

const validation = schema.validate(value);

if(validation.error) {
	// aquí nunca va a llegar porque el esquema valida cualquier valor
	console.error('No es válido');
}
```

Realmente esto no es muy útil pero combinado con una serie de métodos extra encadenados podemos hacer la validación más potente (y que sirva para algo).

Por ejemplo si hacemos que el schema tenga el método `required()` hará que no permita valores `undefined` (pero si null):

```js
const Joi = require('@hapi/joi');

const schema = Joi.any().required(); 

let value; // value vale undefined

const validation = schema.validate(value);

if(validation.error) {
	console.error('No es válido'); // va a imprimir esto
}
```

otros métodos importantes:

- `.valid(a, b, c)`: hará que sólo sean válidos los valores a, b o c.
- `.invalid(a, b, c)`: hará que los valores a, b y c siempre sean inválidos.
- `.allow(a, b, c)`: hará que los valores a, b o c sean válidos siempre independientemente de otras restricciones.

### Validando Strings

En lugar de usar `Joi.any()` que por defecto valida cualquier cosa (numeros, strings, objetos, etc...) podemos centrarnos en validar sólo Strings.

```js
const Joi = require('@hapi/joi');

const schema = Joi.string().required(); 

const validation = schema.validate(42);

if(validation.error) {
	console.error('No es un string'); // va a imprimir esto
}
```

y aparte de los métodos comentados anteriormente (required, valid, invalid, allow) tenemos los siguientes métodos (entre otros) para complementarlo:

- Longitud de la cadena:
	- `Joi.string().min(10)`: valida solo strings con unha longitud mínima de 10 caracteres.
	- `Joi.string().max(10)`: lo mismo pero para longitud máxima.
	- `Joi.string().length(10)`: solo valida strings con una longitud de 10 caracteres.
- Contenido de la cadena:
	- `Joi.string().email()`: valida solo emails.
	- `Joi.string().ip()`: valida solo direcciones IP.
	- `Joi.string().uri()`: valida solo URLs.
	- `Joi.string().creditCard()`: valida números de tarjetas de crédito.
- Formato de la cadena:
	- `Joi.string().lowercase()`: valida solo textos en minúsculas.
	- `Joi.string().uppercase()`: lo mismo pero en mayúsculas.

### Validando números

Para validar números usamos `Joi.number()` complementado con los siguientes métodos:

- `Joi.number().min(value)`: value sería el número mínimo.
- `Joi.number().max(value)`: value sería el número máximo.
- `Joi.number().precision(n)`: n sería el máximo de decimales admintidos.
- `Joi.number().positive()`: solo acepta números positivos. También existe el método `.negative()`.
- `Joi.number().integer()`: solo acepta números enteros.

### Validando fechas

Para validar fechas usamos `Joi.date()` que tiene los siguientes métodos.

- `Joi.date().min(date)`: date sería la fecha mínima.
- `Joi.date().max(date)`: date sería la fecha máxima.
- `Joi.date().timestamp()`: aceptaría solo *unix time*.

### Validando objetos

Hasta ahora vimos como Joi podía validar facilmente valores pero lo que queremos probablemente es que valide objetos formados por keys y values.

Para crear un esquema que valide un objeto simplemente tenemos que combinar todo lo que vimos hasta ahora con este formato:

```js
const Joi = require('@hapi/joi');

const schema = Joi.object().keys({
	username: Joi.string().min(3).max(20).required(),
	email: Joi.string().email().required(),
	age: Joi.number().min(18)
}); 

const validation = schema.validate({
	username: "Berto",
	email: "berto@ber.to"
});

// El objeto anterior va a validar porque el key "age" no es required por lo tanto no imprimirá el error.
if(validation.error) {
	console.error('No es un objeto válido');
}
```