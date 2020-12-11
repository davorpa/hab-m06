# npm

- npm
- dotenv para gestionar variables de entorno
- minimist para gestionar arguments
- Nodemon para trabajo de desarrollo

## npm

npm es un acrónimo de Node Package Manager y se trata de un software que permite instalar módulos de Node en nuestro ordenador que podemos importar en nuestros programas de Node. Estos módulos son hechos por individuos u organizaciones y se guardan en un registro global mantenido por la empresa que hace el software npm.

Aparte de los módulos que aprendimos a crear en Node y los módulos que trae Node de serie hay mucha gente que se dedica a realizar módulos y los publica en npm, algunos de ellos muy famosos y con cientos de miles de usuarios diarios. Estos módulos sirven para cosas muy diversas, desde conversores de fechas a editores de imágenes o a servidores web completos.

npm nos permitirá instalar y actualizar eses módulos tanto localmente que sólo serán usables por el proyecto de Node que esté en el directorio actual, en este caso se llaman **dependencias** ya que el proyecto depende de estos módulos para funcionar. También permitirá instalar módulos globalmente estando disponibles de esta forma en cualquier directorio de nuestro sistema operativo.

### package.json

Es recomendable que cualquier proyecto de Node en nuestro ordenador contenga en su directorio raíz un archivo llamado _package.json_. En este archivo de texto se guardará meta información del proyecto, una lista de módulos instalados que son importados en el proyecto (y sin los cuales no funcionaría) así como una serie de comandos que podremos configurar y ejecutar.

### Meta información

Una de las funciones del _package.json_ es guardar meta información del proyecto como el nombre, descripción, versión, licencia. Por ejemplo un _package.json_ con esa información tendría este aspecto

```js
{
  "name": "mi-proyecto",
  "version": "0.1",
  "description": "Descripción de mi proyecto",
  "main": "index.js" // Fichero principal del proyecto
  "license": "MIT" // MIT es un tipo de licencia open source
}
```

### Inicializando un proyecto de node

Podemos generar el _package.json_ inicial de un proyecto de node con el comando `npm init` que nos hará una serie de preguntas para configurar la meta información del proyecto y finalmente escribirá en el directorio actual el _package.json_ con esos datos.

Si queremos crear un _package.json_ con datos genéricos y después editarlo manualmente podemos ejecutar `npm init -y`.

### Instalando dependencias (módulos)

La función principal de npm es instalar módulos o dependencias de nuestros proyectos y _package.json_ se encarga de guardar la lista de dependencias.

Instalamos una dependencia usando el comando `npm install <modulo>`, esto buscará ese módulo en el registro de npm y si lo encuentra lo descargará y lo colocará en el directorio `node_modules` de la carpeta actual.

Desde el momento que está descargado podemos usarlo en cualquier archivo js que esté en el directorio del proyecto usando `require('modulo')` sólo usando el nombre sin usar paths relativos.

Si instalamos una dependencia del modo anterior no se guardará la referencia en nuestro _package.json_ para ello tenemos que usar:

`npm install <modulo> --save`: que guardará el nombre y versión del módulo en las dependencias principales del proyecto.

o `npm install <modulo> --save-dev`: que guardará el nombre y versión del módulo en las dependencias de desarrollo del proyecto.

Las dependencias principales del proyecto son las dependencias que el proyecto necesita para funcionar cuando esté en "producción", o sea, funcionando publicamente.

Las dependencias de desarrollo del proyecto son dependencias que necesitamos mientra estamos trabajando en el mismo, como por ejemplo un servidor web local que se auto actualize como por ejemplo `browser-sync` o un detector de errores de código como `eslint`.

Si borramos el directorio `node_modules` (usando `rm -r node_modules`, por ejemplo) y en nuestro _package.json_ tenemos registradas la lista de dependencias no será necesario instalarlas una a una de nuevo, podremos ejecutar:

- `npm install`: instalará todas las dependencias
- `npm install --only=prod`: sólo instalará las dependencias principales.
- `npm install --only=dev`: sólo instalará las dependencias de desarrollo.

### Dependencias ejecutables 

Algunas dependencias instalan comandos ejecutables desde la línea de comandos, por ejemplo vamos instalar una dependencia que nos es muy útil pero es ilustrativa. Creamos un directorio y ejecutamos:

```
npm init -y
npm install cowsay --save
```

este módulo `cowsay` instala un ejecutable que muestra en la consola un dibujo en ASCII de una vaca con un mensaje (!!) y podemos ejecutarlo así:

`./node_modules/.bin/cowsay ola amigas!`

y en la consola aparecerá esto:

```
 _____________
< ola amigas! >
 -------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```

Ese comando no es muy fácil de ejecutar y está un poco oculto pero podremos ejecutarlo de forma más fácil si configuramos un script en _package.json_.

Si abrimos el _package.json_ vemos que hay una parte donde hay una lista de scripts con un nombre (de momento sólo hay uno):

```
...
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
...
```

Podremos crear un script nuevo de esta forma:

```
...
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "saluda": "cowsay hola!!"
  },
...
```

Vemos que desde aquí no tenemos porque poner la ruta completa hasta el ejecutable `cowsay` si no que lo ponemos directamente.

Podremos ejecutar ese script con `npm run <nombre_script>` en este caso `npm run saluda`. 

Conocemos ya un caso similar en los módulos anteriores con `browser-sync`.

### Módulos globales

Si queremos instalar un módulo que no sea una dependencia de un proyecto y que esté disponible en cualquier lugar de nuestro sistema operativo podemos instalarlo de esta forma:

`npm install -g cowsay` (por ejemplo)

en ese caso el módulo se instalará globalmente y el comando que instale podremos ejecutarlo desde la consola en cualquier lugar directamente como `cowsay`.


## dotenv

Desde días anteriores conocemos como funcionan las variables de entorno en Node. Si ejecutamos un programa de node de esta forma:

`VARIABLE=1234 node app.js`

dentro de app.js podemos hacer:

`console.log(process.env.VARIABLE)` 

esto imprimirá `1234`.

Pero asignar variables de entorno a un programa de Node así es un poco complicado y nos obliga a usarlas siempre que los ejecutamos.

Para hacernos la vida más fácil podemos crear un fichero `.env` en la raíz de nuestro proyecto con este contenido:

```
VARIABLE=1234
OTRA_VARIABLE=5678
```

los ficheros `.env` siguen las siguientes reglas:

- las líneas vacías se ignoran
- las líneas que empiecen por # también se ignoran

Para usar las variables de entorno definidas en ese archivo en cualquier archivo .js de nuestro proyecto podemos instalar el módulo `dotenv`:

`npm install dotenv --save`

y en cualquier archivo podemos usar:

```
const dotenv = require('dotenv');
dotenv.config();

//desde ese momento todas las variables de entorno definidas en el archivo .env estarán disponibles en process.env

console.log(process.env.VARIABLE); // 1234
console.log(process.env.OTRA_VARIABLE); // 5678
```

Esto funciona tanto en ficheros que estén en la raíz del proyecto como en cualquier fichero que esté en un subdirectorio.

Es importante que el archivo .env no se envíe al repositorio ya que normalmente en el se guarda configuración específica para el sitio donde esté instalado el proyecto. Para ello podemos añadir a nuestro .gitignore una linea que sea `.env`.


## minimist

Los argumentos que pasamos a un programa de Node están disponibles en el Array `process.argv`, por ejemplo si ejecutamos:

`node calculadora.js --operacion=suma -a 300 -b 250`

dentro de editor.js el Array `process.argv` tendría este valor:

```js
[
'<path-al-ejecutable-node>',
'<path-al-fichero-editor.js'>',
'--operacion',
'suma',
'-a',
'300',
'-b',
'250'
]
```

Podemos ver que en ese array están todos los argumentos pero realmente son poco manejables ya que nos gustaría que la configuración estuviera mejor organizada.

Para procesar mejor los argumentos podemos usar el módulo 'minimist`, instalándolo de esta forma:

`npm install minimist --save`

en app podemos hacer:

```js
const argsParser = require('minimist');

const arguments = argsParser(process.argv.slice(2));

console.log(arguments);
```

el resultado sería un objecto con este formato:

```
{
	_: [],
	operacion: 'suma',
	a: 300,
	b: 250
}
```

que sería mucho más fácil de procesar.

El array con el key "_" serían los argumentos no asociados a una variable de configuración. Por ejemplo.

`node editor.js imagen.jpg -width 200 --output=miniatura.jpg`

en este caso el array sería:

```
{
 _: ['imagen.jpg'],
 width: 200,
 output: 'miniatura.jpg'
}
```


## nodemon

Cuando trabajamos con JavaScript en el navegador y hacemos un cambio a un archivo js sólo tenemos que recargar la página donde se ejecuta en el navegador y ya se verán reflejados los cambios. Pero esto en Node no pasa si el proceso se mantiene abierto, por ejemplo, tenemos este app.js:

```js
const repeat = () => {
	console.log('hello world!');
}

setInterval(repeat, 1000);
```

cuando ejecutamos ese app.js empezará a escribir en la consola cada segundo "hello world!" indefinidamente, sólo se parará cuando pulsemos Control+C (o paremos el proceso de otra forma).

Si mientras se está ejecutando modificamos app.js y cambiamos el texto de "hello world!" a "hello friends!" veremos que el proceso de node sigue mostrando "hello world!" ya que sigue ejecutando el proceso original. Para que se vean reflejados los cambios tenemos que parar el proceso y volver a ejecutarlo. 

Este comportamiento es el correcto pero cuando estamos trabajando en un fichero js sería mucho mejor que cuando realizamos un cambio el proceso de node se auto-reiniciara para ver los cambios en tiempo real.

Para conseguir esto instalamos el módulo `nodemon` que sólo será necesario para el desarrollo:

`npm install nodemon --save-dev`

y modificamos nuestro _package.json_ creando un nuevo script que ejecute el comando nodemon para lanzar el proyecto:

```
...
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon app.js"
  },
...
```

y ahora podemos iniciar nuestro app.js usando: `npm run dev` que realmente ejecutará el fichero usando nodemon y automáticamente se reiniciará con cualquier cambio en app.js.

Por defecto nodemon también tiene en cuenta todos los cambios en el mismo directorio no sólo en app.js por lo que también reiniciará el proceso si hacemos cambios en otros ficheros. Esto no incluye a los contenidos de `node_modules`.

Más información sobre su uso [aquí](https://alligator.io/workflow/nodemon/).