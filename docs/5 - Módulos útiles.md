# Módulos útiles

- Módulos externos de node útiles
- date-fns
- lodash
- chalk
- sharp


## Módulos externos de node útiles

Como vimos estos últimos días, aparte de las características nativas de JavaScript, Node dispone de unos _core modules_ que son potentes pero bastante limitados. Esto está complementado con un ecosistema de módulos de terceros muy amplio y diverso. En la gran mayoría de nuestros proyectos usaremos estes módulos externos instalables mediante _npm_. Usar estos módulos externos no es obligatorio y prácticamente cualquier proyecto podremos realizarlo usando sólo JavaScript puro y los _core modules_ pero veremos como muchos de estos módulos nos ayudan mucho en nuestras tareas.

Ya vimos algún módulo externo útil como _dotenv_, _minimist_ o _nodemon_. En este documento veremos algún módulo externo especialmente útil que nos ayudará en futuros proyectos.

## Fechas en JavaScript

Manejar fechas es una de las tareas más habituales en el desarrollo de backend. JavaScript soporta un manejo básico de fechas que aún que bastante potente es limitado a la hora de hacer determinados cálculos.

Para conseguir la fecha actual en JS usamos el constructor de la clase `Date`:

```js
const now = new Date();
console.log(now);
//Fri Apr 24 2020 11:24:53 GMT+0200 (Central European Summer Time)
```

El formato por defecto de salida nos muestra:

|Día semana|Mes|Día mes|Año|Hora|Zona horaria|
|:-:|:-:|:-:|:-:|:-:|:-:|
|Fri|Apr|24|2020|11:24:53| GMT+0200 ...|

Otra de las formas de representar las fechas en JS es el [Unix Time](https://en.wikipedia.org/wiki/Unix_time) que es el número de milisegundos que pasaron desde la medianoche del 1 de enero de 1970. Para conseguir ese número usamos:

`now.getTime(); //1587720721388`

Este formato numérico es muy útil para comprobar si una fecha es mayor o menor que otra.

Si queremos trabajar con otra fecha que no sea la actual podremos definirla usando el mismo constructor:

- `new Date()`: como ya vimos nos da la fecha actual.
- `new Date(<Unix time>): construye una fecha en base al Unix Time que le pasemos.
- `new Date(<String>)`: construye una fecha en base a una fecha en formato texto.
- `new Date(year, month, day, hours, minutes, seconds, milliseconds`: construye una fecha en base a eses valores numéricos.

Por ejemplo:

```js
// Unix time
new Date(-200000);

// Cadena de texto
new Date("September 2 1976 07:00");

// Valores numéricos
new Date(2001, 2, 3, 17, 22, 30, 0);
```

Después de tener construída una fecha podemos acceder a los componentes usando los siguientes métodos:

- `now.getFullYear()`: nos dará el año
- `now.getMonth()`: nos dará el mes (entre 0 y 11)
- `now.getDate()`: nos dará el día del mes
- `now.getDay()`: nos dará el día de la semana (entre 0 y 6)
- `now.getHour()`: nos dara la hora
- `now.getMinutes()`: nos dará los minutos
- `now.getSeconds()`: nos dará los segundos
- `now.getMilliseconds()`: nos dará los milisegundos
- `now.getTime()`: nos dará el Unix Time.

```js
const now = new Date();
//Fri Apr 24 2020 11:24:53 GMT+0200 (Central European Summer Time)

now.getFullYear(); //2020
now.getMonth(); //3
...
```

y también podremos modificar una fecha usando los mismos métodos pero en lugar de `get` usamos `set`:

```js
const now = new Date();
//Fri Apr 24 2020 11:24:53 GMT+0200 (Central European Summer Time)

now.setFullYear(1920);
//Fri Apr 24 1920 11:24:53 GMT+0200 (Central European Summer Time)
```

### date-fns

El módulo [date-fns](https://date-fns.org/docs/Getting-Started) nos permite realizar muchas más operaciones con las fechas que serían compliadas de realizar sólo usando el objecto nativo de JavaScript.

Para instalarlo usamos:

`npm install date-fns --save`

Este módulo exporta multitud de funciones que nos ayudan a trabajar con fechas, por ejemplo, para compararlas, formatearlas, transformarlas o realizar comprobaciones.

Por ejemplo, para formatear una fecha:

```js
const {format} = require('date-fns'); //requerimos la función que queremos desestructurando.
const {es} = require('date-fns/locale');

console.log(format(new Date(), "EEEE, d 'de' MMMM 'de' yyyy", {locale: es}));
//viernes, 24 de abril de 2020
```

Usamos una cadena "EEEE, d 'de' MMMM 'de' yyyy" como template de la fecha, y la funcion format sustituye partes de esa cadena por los valores de la fecha. Los caracteres que vayan entre comillas simples no los transformará.

Vemos también que le pasamos una opción `{locale: es}` para indicarle que use el objecto `es` que importamos previamente para indicar que use el idioma español para sustituir. 

Podemos ver las sustuciones en la [documentación de format](https://date-fns.org/v2.12.0/docs/format).

Otras funciones interesantes de la librería son:

- [formatDistance](https://date-fns.org/v2.12.0/docs/formatDistance): nos dará una cadena de texto humanizada que representa la distancia entre dos fechas, por ejemplo: 'menos de un mes'.
- [add](https://date-fns.org/v2.12.0/docs/add) y [sub](https://date-fns.org/v2.12.0/docs/sub): nos permiten añadir o restar años, meses, días, etc... a una fecha
- [isAfter](https://date-fns.org/v2.12.0/docs/isAfter), [isBefore](https://date-fns.org/v2.12.0/docs/isBefore), [isDate](https://date-fns.org/v2.12.0/docs/isDate), [isExists](https://date-fns.org/v2.12.0/docs/isExists), [isFuture](https://date-fns.org/v2.12.0/docs/isFuture), [isPast](https://date-fns.org/v2.12.0/docs/isPast), [isValid](https://date-fns.org/v2.12.0/docs/isValid): estas funciones nos devuelven un booleano si la fecha que le pasamos cumple las condiciones obvias.
- [parse](https://date-fns.org/v2.12.0/docs/parse): esta función nos permite convertir una cadena de texto a una fecha indicandole un template de texto, es la inversa de format.

## lodash

Lodash es una colección de funciones que nos permiten realizar muchas tareas de programación forma fácil. Muchas de las funciones que proporciona esta librería realizan operaciones que ya sabemos hacerlas con javascript, por ejemplo dispone de una funcion llamada `first` que nos da el primer elemento de un Array, pero ya sabemos que esto podemos hacerlo con JS directamente usando `array[0]`, en estes casos debemos evitar usar una librería externa y usar JS directamente. 

Instalamos lodash así:

`npm install lodash --save`

y podemos requerir cualquier funcion usando, por ejemplo:

`const {random} = require('lodash');`

Algunas funciones útiles de lodash:

- [random](https://lodash.com/docs/4.17.15#random): nos da un valor aleatorio entre dos números.
- [sample](https://lodash.com/docs/4.17.15#sample), [sampleSize](https://lodash.com/docs/4.17.15#sampleSize): escoge uno o varios elementos aleatorios de un array.
- [shuffle](https://lodash.com/docs/4.17.15#shuffle): reordena aleatoriamente un array.

En general esta librería esta en proceso de desaparición porque el JavaScript nativo cada vez es más potente pero su uso está bastante extendido por lo que es importante mencionarla en esta documentación. 

Hay páginas como ["You don't need lodash"](https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore) que proporcionan métodos alternativos en JavaScript puro a practicamente la totalidad de las funciones de lodash.

## Chalk

Cuando imprimimos algo en la consola por defecto aparece en un sólo color, probablemente blanco si tenemos la consola con fondo negro.

El módulo chalk nos permite imprimir contenido en la consola en 256 colores (si nuestro terminal los soporta, probablemente si usamos un sistema operativo moderno).

Instalamos chalk usando:

`npm install chalk --save`

y lo usamos de la siguiente forma:

```js
const chalk = require('chalk');

console.log(chalk.italic('Texto en itálica'); //se imprimirá en cursiva

console.log(chalk.blue('Esto sale en azul')); //se imprimirá en azul

console.log(chalk.bgYellowBright('Esto tendrá fondo amarillo'); //eso...
```

Podemos ver todos los métodos que dan estilo, color y fondo a los console.logs [en la documentación](https://github.com/chalk/chalk#colors).

También podemos usarlo en template literals:

```js
const age = 43;
const height = 179;

console.log(chalk`
{blue.bold Datos:}
- {red Edad}: {bold ${age} años}
- {red Altura}: {bold ${height} cm}
`);
```

## sharp

El procesado de imágenes es uno de las tareas típicas de Node, veremos que en muchas aplicaciones web los usuarios suben imágenes a las que tendremos que cambiar el formato, tamaño, recortar o incluso modificar colores o componer con otras.

El módulo `sharp` nos permite realizar esas operaciones de una forma rápida y fácil.

Para instalarlo:

`npm install sharp --save`

**Los siguientes ejemplos usan await por lo que asumen que están metidos en una función asíncrona y en un try...catch***

### Abriendo imágenes

y podemos usarlo abriendo directamente un path de una imagen:

```js
const sharp = require('sharp');
const path = require('path');

const image = sharp('./images/image.png');

const image2 = sharp(path.join(__dirname, 'image.jpg');
```

o si tenemos la imagen abierta previamente:

```js
const sharp = require('sharp');
const fs = require('fs');

const imageBuffer = fs.readFileSync('./images/image.jpg');

const image = sharp(imageBuffer);
```

### Accediendo a información de las imágenes

De la misma forma que con el método `fs.stat` accediamos a información de un fichero podemos acceder a información de una imágen con el método `metadata`:

```js
const image = sharp('./images/image.jpg');

const metadata = await image.metadata();

console.log(metadata.width); //nos da el ancho de la imagen en px
console.log(metadata.format); //nos da jpg
```

En la documentación podemos ver toda la información que nos proporciona [el objecto metadata](https://sharp.pixelplumbing.com/api-input#metadata).

### Guardando imágenes

Después de tener guardada una imagen en una variable podemos hacer las modificaciones que necesitemos (ver las siguiente secciones) y guardarla.

Podemos directamente guardarla a un archivo:

```
const imagen = sharp(<input>);

await imagen.toFile('fichero.png');
```

Sharp hará la conversión al formato que indiquemos en la extensión del fichero con el que guardamos la imagen.

También podremos guardarla temporalmente en un buffer que podremos escribir con el módulo `fs:

```js
const sharp = require('sharp');
const fs = require('fs').promises;

async function process(image) {
	const i = sharp(image);

	i.resize(400).toFormat('png');

	await fs.writeFile('foto.png', await i.toBuffer());

}

process('./foto.jpg');
```

En el ejemplo anterior usamos el método `toFormat(format)` para modificar el formato de la imagen antes de convertirla a Buffer ya que no hace el cambio de formato automático como cuando la guardamos con un nombre de fichero.

También podemos usar los métodos `.jpeg`, `.png` que permiten asignarles un objeto de opciones para controlar mejor la exportación, en [la documentación tenéis más info](https://sharp.pixelplumbing.com/api-output#jpeg).

### Modificando imágenes

Modificando el tamaño:

- [resize](https://sharp.pixelplumbing.com/api-resize#resize): para cambiar el tamaño de una imagen.
- [extract](https://sharp.pixelplumbing.com/api-resize#resize): para recortar una parte de una imagen.
- [trim](https://sharp.pixelplumbing.com/api-resize#trim): recorta los píxeles de un solo color que rodean una imagen.

Componiendo dos imágenes, por ejemplo para poner una marca de agua:

```js
const sharp = require("sharp");
const fs = require("fs").promises;

async function process(image) {
  const i = sharp(image);

  i.composite([
    {
      input: "./logo.png",
      gravity: "southeast",
    },
  ]).toFormat("png");

  await fs.writeFile("foto.png", await i.toBuffer());
}

process("./foto.jpg");
```

Este ejemplo colocará la imagen _logo.png_ sobre _foto.jpg_ y guardará el resultado como _foto.png_.

### Otras modificaciones

La librería sharp proporciona métodos similares a los anteriores para rotar, espejar, difuminar que podemos ver en la sección de [Image operations](https://sharp.pixelplumbing.com/api-operation) de la documentación.

También existen otros métodos de modificación de color para transformar las imágenes a [escala de grises](https://sharp.pixelplumbing.com/api-colour#greyscale).

Todas estas operaciones se usan de la misma forma que los métodos especificados anteriormente.