# Core modules

- Intro a los core modules principales de Node
- Módulo os
- Módulo path
- Módulo fs
- Módulo util
- Trabajando con JSON en nodejs

## Intro a los core modules principales de Node

Node trae por defecto una serie de módulos para realizar múltiples tareas básicas relacionadas con el sistema, ficheros, red, etc..., son los llamados _core modules_ y que podemos requerir en nuestro código sin necesidad de instalarlos mediante npm.

Podemos ver la lista y el manual de uso de todos ellos en la [documentación de Node](https://nodejs.org/api/). La lista es bastante grande (aún que no enorme) y nosotros sólo vamos a ver unos pocos que son especialmente importantes.

- **os**: nos permitirá conseguir información sobre el sistema operativo
- **path**: este módulo nos permitirá trabajar con rutas del sistema operativo
- **fs**: para trabajar con ficheros y directorios
- **util**: este modulo pone a disposición diversas utilidades que nos ayudarán a la hora de programar.

## os

El módulo os nos permite conseguir información sobre el sistema operativo donde se está ejecutando el proceso de Node. Cosas como la memoria total, la memoria libre, el número y estado de los procesadores, el tiempo que lleva encendido y otras cosas relacionadas.

Su uso es marginal pero nos da información que en algún momento puede ser útil y no podemos conseguir de otra forma, para usar el módulo primero tenemos que requerirlo:

`const os = require('os');`

- [os.totalmem()](https://nodejs.org/api/os.html#os_os_totalmem): nos da el total de memoria del sistema.
- [os.freemem()](https://nodejs.org/api/os.html#os_os_freemem): el total de memoria libre.
- [os.hostname()](https://nodejs.org/api/os.html#os_os_hostname): el nombre del host.
- [os.homedir()](https://nodejs.org/api/os.html#os_os_homedir): la ruta del directorio personal del usuario que ejecuta el proceso de node.
- [os.tmpdir()](https://nodejs.org/api/os.html#os_os_tmpdir): la ruta del directorio temporal donde podremos guardar archivos que no queremos guardar permanentemente.

Más información sobre el módulo os en [la documentación](https://nodejs.org/api/os.html).

## path

El módulo path nos servirá para manejar y transformar paths (rutas) de directorios del sistema operativo. Es un módulo importante ya que las rutas de los diferentes sistemas operativos no tienen un formato común y este módulo nos garantizará que nuestra aplicación funcionará bien en cualquier sistema.

`const path = require('path');`

- [path.normalize(path)](https://nodejs.org/api/path.html#path_path_normalize_path): nos permite normalizar un path, resolviendo las partes ambíguas o que se refieran a directorios anteriores o el mismo.
- [path.join(path)](https://nodejs.org/api/path.html#path_path_join_paths): nos permite construír un path por partes de forma segura e independiente del sistema operativo.
- [path.resolve(path)](https://nodejs.org/api/path.html#path_path_resolve_paths): combina una serie de paths para convertirlos en un path absoluto
- [path.dirname(path)](https://nodejs.org/api/path.html#path_path_dirname_path): nos permitirá saber cual es el directorio donde está un directorio o fichero
- [path.extname(path)](https://nodejs.org/api/path.html#path_path_extname_path): nos dará la extensión de un fichero

Otros métodos y propiedades del módulo path en [la documentación](https://nodejs.org/api/path.html).

## fs

El módulo fs es el más importante de los _core modules_ de Node y nos permitirá interactuar con el sistema de ficheros. Usaremos este módulo para leer, crear, escribir o borrar ficheros y directorios. Se usa requiriendo el módulo fs:

`const fs = require('fs');

Los métodos que proporciona este módulo para trabajar con ficheros normalmente tienen dos versiones, una asíncrona y otra síncrona. En versión asíncrona ejecutaremos un método (por ejemplo, escribir un fichero) y le pasaremos un callback que se ejecutará cuando acabe de realizar la tarea:

```js
fs.writeFile('fichero.txt', 'Ola amigas!', function(error) {
	if(error) console.error(error);
	
	console.log('El fichero se escribió correctamente');
});

console.log('seguimos haciendo cosas'); //Esto se va a imprimir antes del console log del callback anterior.
```

Al trabajar con este tipo de métodos asíncronos le estamos diciendo a Node que escriba ese fichero y siga atendiendo a otras tareas pendientes pero cuando acabe que ejecute la función que le pasamos como callback.

La otra versión de los métodos de `fs` es la versión síncrona. Los métodos síncronos normalmente tienen el mismo nombre que los asíncronos pero acabado en _Sync_. Estos métodos síncronos van obligar a Node a esperar a que acabe la tarea (como antes, por ejemplo, escribir un fichero) sin hacer nada.

```js
fs.writeFileSync('fichero.txt', 'Ola amigas!');
console.log('Cuando esto se imprima el fichero ya estará escrito en disco');
```

Usar métodos síncronos es más simple que usar callbacks y no hay ningún problema en hacerlo cuando sabemos que el proceso de Node solo lo va a usar una persona (por ejemplo, una aplicación de terminal) pero por ejemplo, si lo usamos en un servidor web tenemos que tener en cuenta que mientras no acabe un método síncrono el servidor web estará parado y no atenderá otras peticiones hasta que acabe de ejecutar.

En otras palabras, los métodos síncronos paran el Event Loop y no debemos usarlos en nuestros servidores http de Node.

Los métodos de `fs` que usan callback no son promesas por lo que no los podremos usar como usamos las promesas:

```js
fs.writeFile('fichero.txt', 'Ola amigas!')
	.then(() => console.log('el fichero está escrito');)
	.catch(error => console.error('hubo un error', error.message);)
	
	//Esto no va a funcionar (ver abajo)
```

Pero desde hace unas cuantas versiones de node si que tenemos disponibles una versión de los métodos más importantes de `fs` que devuelven una promesa, para ello en lugar de requerir `fs` como explicamos antes hacemos esto:

`const fs = require('fs').promises;`

ahora ya podremos usar los métodos de fs como promesas, tanto con `.then` como en funciones async/await:

```js

const fs = require('fs').promises;

async function readFile(file) {
	const data = await fs.readFile('file');
	return data.toString();
}

async function main() {
	try {
		const content = await readFile('fichero.txt');
		
		console.log(content)
	} catch(error) {
		console.error('hubo un error leyendo el fichero');
	}
}

main();
```

A partir de ahora usaremos siempre la versión "promesa" de los métodos de `fs` ya que en este caso tampoco bloquean el Event Loop.

**Asumimos que los ejemplos siguientes que todas estes métodos están siendo llamados dentro de funciones *async* y try...catch que no escribo para ahorrar código.**

### Ver información de un fichero

Para ver la información de un fichero podemos usar:

```js
const stats = await fs.stat('./files/image.jpg');

// ahora stats es un objeto que tiene información sobre el fichero
```

Este objeto stats tiene una serie de propiedades y métodos sobre las características del fichero, por ejemplo:

- *stats.size*: tamaño del fichero en bytes
- *stats.mtime*: fecha de la última modificación
- *stats.birthtime*: fecha de creación

y algún método interesante como:

- _stats.isFile()_: Booleano que dice si es un fichero o no.
- _stats.isDirectory()_: Booleano que dice si es un directorio o no.

Más propiedades y métodos [en la documentación](https://nodejs.org/api/fs.html#fs_class_fs_stats).

Si queremos saber la extensión del fichero podemos usar el método `extname` del módulo path visto anteriormente.

### Leer un fichero

Para leer el contenido de un fichero:

```js
const content = await fs.readFile('./fichero.txt');

console.log(content.toString());
```

Por defecto en node el resultado de leer un fichero es un objecto [de tipo Buffer](https://nodejs.org/api/buffer.html) que representa a un formato binario. Si sabemos que es un fichero de texto podemos usar el método de Buffer `.toString()` que transformará el Buffer a una cadena de texto.

Si queremos intentar transformar el contenido del fichero a una cadena de texto en el momento de la lectura podemos pasarle un segundo argumento con la codificación de caracteres, por ejemplo `fs.readFile('./fichero.txt', 'utf-8');`.

### Escribir un fichero

Para escribir una cadena de texto o Buffer en un fichero:

```js
const data = 'lorem ipsum';
await fs.writeFile('fichero.ext', data);
```

### Borrar un fichero

Para borrar un fichero usamos:

```js
await fs.unlink('fichero.ext');
```

### Comprobar si existe un fichero o directorio

Podemos comprobar si existe una ruta en general de esta forma:

```js
try {
	await fs.access('./ruta/')
} catch (error) {
	if(error.code === 'ENOENT') {
		console.log('El fichero o directorio no existe');
	}
}
```

El código de error "ENOENT" es uno de los [múltiples códigos de error típicos](https://nodejs.org/api/errors.html#errors_common_system_errors) que Node puede dar en alguna de las operaciones más comunes. Este concretamente es el error correspondiente a que no encuentra un fichero o directorio.

### Crear un directorio

Podemos crear un directorio así:

```js
await fs.mkdir('./directorio');
```

si queremos crear varios recurvisamente podemos usar esta opción:

```js
await fs.mkdir('./directorio1/directorio2/directorios3', { 
	recursive: true
});
```

En este caso creará los 3 directorios anidados.

### Leer un directorio

Para leer los ficheros de un directorio y por ejemplo imprimir su tamaño en bytes:

```js
const fs = require("fs").promises;
const path = require("path");

async function listDirectoryInfo(directory) {
  try {
    const dir = path.resolve(__dirname, directory);

    await fs.stat(dir);

    console.log(`Leyendo los contenidos de ${dir}`);

    const files = await fs.readdir(dir);

    for (const fileName of files) {
      const file = path.join(dir, fileName);
      const info = await fs.stat(file);

      if (info.isDirectory()) {
        console.log(`${fileName} es un directorio`);
      } else {
        console.log(`El tamaño de ${fileName} es ${info.size} bytes`);
      }
    }
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error("El directorio no existe");
    } else {
      console.error(error.message);
    }
  }
}

listDirectoryInfo(process.argv[2]);

```

### Borrar un directorio

Para borrar un directorio podemos usar:

```js
await fs.rmdir('directorio');
```

y si queremos borrar recursivamente (con cuidado!):

```js
await fs.rmdir('directorio', {
	recursive: true
});
```

El módulo fs tiene muchos otros métodos que podéis ver [en la documentación](https://nodejs.org/api/fs.html), pero estos son los más comunes.

## Trabajando con JSON en Node

JSON será el formato más habitual el el que podréis guardar estructuras datos puros. Muchas veces en vuestros programas de node tendréis que leer y guardar en disco ficheros JSON.

Para leer un archivo JSON podéis usar el módulo `fs` que acabamos de ver, por ejemplo si tenemos un `fichero.json` así:

```json
{
	"provincias": ["lugo", "coruña", "ourense", "pontevedra"]
}
```

podremos leerlo de esta forma:

```js
const fs = require('fs'); //no uso promises en este caso, pero podría

const fileData = fs.readFileSync('./fichero.json');
const data = JSON.parse(fileData.toString());

console.log(data.provincias[0]); //esto imprime "lugo"
```

pero dado que el uso de JSON es tan habitual en Node tenemos una manera muchísimo más fácil de leer un archivo json:

```js
const json = require('./fichero.json');

console.log(json.provincias[0]); //esto imprime "lugo"
```

listo, así ya tendríamos los datos del fichero json disponibles para usar.

Para escribir un fichero JSON no hay una forma más fácil que la que ya conocemos usando el módulo `fs`:

```js

const fs = require('fs');

const dimensions = { 
	height: 300,
	width: 200
};

//escribimos el JSON en el fichero dimensions.json
fs.writeFileSync('./dimensions.json', JSON.stringify(dimensions));
```