# Introducción a Node.js

- Introducción a Node.js
- Sistema de módulos
- Globales
- `process` 
- Variables de entorno
- Gestión de argumentos

## Introducción a Node.js

Node.js es un entorno de ejecución de JavaScript de código abierto y que funciona en múltiples plataformas.

Tradicionalmente JavaScript se ejecutaba siempre dentro de los navegadores pero desde que Google Chrome liberó su motor de ejecución de JS (llamado V8) este fue usado para crear Node y permitir la ejecución de JS independientemente del navegador como un proceso independiente más del sistema operativo.

Una de las características más innovadoras de Node fue que se ejecuta en un solo proceso sin duplicarse a sí mismo. Historicamente los programas para atender a peticiones o diferentes trabajos usaban un sistema llamado threads que eran basicamente duplicados de si mismo que se encargaban de gestionar un trabajo (o petición en caso de un servidor web por ejemplo), estas threads usaban cada una su trozo de procesador y memoria y cuando acababan su trabajo se destruían. Esto provocaba un trabajo extra al proceso principal de coordinar todas esas threads, crearlas, pararlas, recoger su resultado, etc... Node en cambio no crea threads, todo se ejecuta en el proceso principal que no se duplica. Para hacer esto usa un método llamado Event Loop que hace que cualquier trabajo que realice node no bloquee el proceso esperando su resultado y simplemente procesándolo cuando esté listo. Esto hace que los procesos de node sean mucho más ligeros y eficientes al no tener que coordinar múltiples threads que aparte de costosas de manejar eran una fuente importante de errores.

Node tuvo mucho éxito desde el principio ya que realmente lo que se está ejecutando es JavaScript y muchos desarrolladores/as ya estaban acostumbrados a usar ese lenguaje en el navegador.

A diferencia del navegador Node es un entorno de ejecución bastante seguro ya que aquí no existe el concepto de múltiples marcas y modelos de navegadores y el código que creemos siempre se va a comportar de la misma forma.

Este es un ejemplo de un pequeño programa de Node que crea un servidor web que responde a diferentes peticiones:

```js
const http = require("http");

const hostname = "127.0.0.1";
const port = process.env.PORT || 3000;

let count = 1;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  if (req.url === "/greeting") {
    res.end(JSON.stringify({ message: `hello ${count} time(s)` }));

    count++;
  } else {
    res.end(JSON.stringify({ URL: req.url }));
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

### Diferencias entre Node.js y el navegador

Todos los conocimientos de JavasScript son tan aplicables al navegador como a Node, pero mientras en el navegador interactuamos con objectos como `window` y `document` para crear webs dinámicas en Node al no existir el navegador eses objetos no existen. 

En Node podemos interactuar mediante su sistema de módulos con otros elementos como el sistema de ficheros o el sistema operativo y de esa forma podemos hacer cosas como crear servidores web que respondan a peticiones del navegador. Este es el uso principal de Node aunque veremos muchos otros.

### Ejecutando programas de Node

Cuando ejecutamos el programa `node` directamente se nos mostrará el REPL que basicamente es una consola similar a las Developer Tools donde podremos ejecutar JavaScript y hacer pequeñas pruebas.

Pero el método más habitual de ejecutar programas de node es escribir nuestro código javascript en ficheros .js y ejecutarlos como argumento al comando `node`, por ejemplo podemos escribir en un fichero `app.js`:

```js
let count = 0;
setInterval(() => {
	console.log(count);
	count++;
}, 1000);
```

ahora podremos ejecutar ese programa usando: `node app.js` y veremos cómo empieza a aparecer el resultado del programa. Podremos pararlo pulsando Control+C o matando el proceso usando el comando `kill`;

## Sistema de módulos de Node: CommonJS

Los programas bien organizados no están todos escritos en un sólo fichero si no que distribuyen su código en múltiples ficheros lo que permite la reutilización de forma más sencilla.

Desde hace poco tiempo los navegadores disponen de un sistema de módulos llamado ES Modules que permiten importar código de otros ficheros (y exportarlo) de forma fácil usando keywords como `import` y `export`. Este sistema de módulos es relativamente moderno y está empezando a estar disponible en Node de forma experimental, pero Node permite desde el principio usar módulos usando otro sistema llamado CommonJS.

CommonJS es un sistema de módulos basado en ficheros:
- Cada fichero es un módulo.
- Podemos exportar partes del código de ese fichero usando `module.exports`
- Podemos importar partes exportadas de otro fichero usando la función global `require`.

Podemos exportar cualquier cosa que sea asignable a una variable en JavasScript, por ejemplo creamos el fichero `module.js`:

```js
function hello() {
	console.log('hello from module.js');
}

module.exports = hello;
```

y en el mismo directorio creamos `main.js`:

```js
const hello = require('./module'); //no tenemos porque que usar .js

hello(); //eso muestra 'hello from module.js'
```

***Importante: al requerir un módulo va asignar a la variable lo que el módulo exporte, pero si el módulo ejecuta algún código ese código se va a ejecutar. Por ejemplo, si hay un console.log o una función que se ejecute.***

Al importar no tenemos porque llamar a la variable `hello`, por lo que esto sería lo mismo:

```js
const imported = require('./module'); //no tenemos porque que usar .js

imported(); //eso muestra 'hello from module.js'
```

esto es así porque el módulo `module.js` sólo exporta una cosa, pero podemos hacer que exporte varias:

```js
function hello() {
	console.log('hello from module.js');
}

function world() {
	console.log('the world if at home');
}

module.exports = { hello, world };
```

En este caso podemos importar una sola de estas funciones desestructurando:

```js
const { world } = require('./module.js');
world(); //esto muestra 'the world is at home'
```

También podemos hacer `require` a un directorio, en ese caso Node intentará importar el fichero `index.js` en ese directorio y generando un error si no lo encuentra.

A diferencia de los ES Modules `require` puede ejecutarse condicionalmente:

```js
let imported;
if(CONDITION) {
	imported = require('./module.js');
}
```

Los módulos de CommonJS mantienen un estado compartido por lo que si cambiamos externamente algo en un módulo esto se verá reflejado en los siguientes `require`, por ejemplo:

Creamos el fichero a.js:

```js
module.exports = {
	count: 30
}
```

Creamos el fichero app.js:

```js
const a = require('./a');
console.log(`La cuenta vale ${a.count}`);
a.count = 40;
const b = require('./b');
```

Creamos el fichero b.js

```js
const a = require('./a')
console.log(`En b.js la cuenta vale ${a.count}`);
```


## Globales en Node

Node pone a disposición pocos identificadores globales pero algunos muy importantes:

- `process`: este objeto global se refiere al proceso de node que se está ejecutando, desde el accederemos a variables de entorno, podremos ver información y asignar eventos relacionados con el proceso o incluso pararlo. Veremos más sobre este objeto.
- `console`: este objeto global nos permitirá escribir información en el output del proceso. Es conocido por ser similar al console del navegador.
- `setTimeout, clearTimeout, setInterval, clearInterval`: estas crear y controlar timers.
- `module`: es una referencia al módulo (fichero) y nos permitirá exportar objectos mediante `module.exports`.
- `__filename`: contiene la ruta completa del fichero.
- `__dirname`: contiene la ruta completa del directorio donde está el fichero.
- `require`: esta función nos permite incluir otros módulos.

## process

Cada vez que lanzamos un proceso de node podemos acceder a información y otras utilidades relacionadas con el proceso mediante el objecto global `process`. 

### Eventos

Podemos usar `process` para asignar eventos al proceso que se está ejecutando, por ejemplo, si queremos hacer algo antes de que el proceso de node se pare (mediante Control+C, usando `kill` o de cualquier otro modo) podemos asignar una función que se ejecute justo antes de parar:

```js
process.on('exit', function () {
  console.log('El proceso de node va a parar');
  // Podemos cerrar la conexión a la base de datos
  // o escribir en disco algún dato importante, o lo que sea
});
```

También podemos hacer que ejecute algo cuando ocurra un error que no tengamos controlado con un `try...catch`, que de otra forma haría que el proceso de node se interrumpiera:

```js
process.on('uncaughtException', function (err) {
  console.error('Ocurrió un error grave!');
  console.error(err.stack);
  
  //De esta forma el proceso de node continuará pero mostrará el error en el terminal.
});
```

### Propiedades

- `process.pid`: nos da el identificador numérico del proceso que se está ejecutando.
- `process.version`: nos da la versión de node que se está ejecutando.
- `process.platform`: nos da el tipo de sistema operativo donde se está ejecutando, como por ejemplo: linux o darwin (para mac).
- `process.title`: por defecto el titulo del proceso es "node" pero podemos escribir esta propiedad a otro nombre y ese será el nombre que aparezca en los comandos de control de procesos como `ps`, `top` o `htop`.

Podemos ver más propiedades del objeto `process` en su [página de documentación](https://nodejs.org/docs/latest-v13.x/api/process.html).

### Variables de entorno

El terminal tiene siempre definidas una serie de variables de entorno que son un conjunto de clave y valor para guardar determinadas configuraciones muy simples, podemos acceder a todas esas variables de entorno usando el comando `env` en un terminal.

Estas variables de entorno guardan datos importantes para el terminal y generalmente son de uso interno. Hay variables de entorno importantes como PATH que tiene una lista de directorios separados por ":" donde el terminal va a mirar si existe el comando que queremos ejecutar, TERM que nos indica el tipo de terminal que estamos usando o USER que guarda el nombre de usuario que queremos usar.

Si queremos definir (o reescribir una variable de entorno) podemos hacerlo usando el comando de terminal `export`, por ejemplo: `export FOO=1234`. Si ejecutamos `env` de nuevo ya veremos ese FOO como una variable de entorno. Estas variables de entorno podemos usarlas en nuestros comandos si le ponemos antes un "$", por lo tanto si ahora hacemos `cd $FOO` será lo mismo que hacer `cd 1234`.

***Importante: estas variables de entorno son a nivel de terminal, si abrimos otra ventana de terminal o cerramos y volvemos a abrir aparecerán las variables de entorno por defecto, para crearlas de forma permanente tenemos que exportarlas (con export) en un fichero que se ejecute siempre que se abra un terminal como .bashrc o .zshrc que hay en nuestro directorio raíz.***

Las variables de entorno también podemos definirlas de forma más efímera y que sólo estén disponibles para el siguiente proceso que ejecutemos. Por ejemplo si creamos un script de shell que se llame `test.sh`:

```sh
#!/bin/sh

echo $USER
echo $MY_VARIABLE
```

y le damos permisos de ejecución `chmod +x test.sh`. Podemos ejecutarlo escribiendo en el terminal `./test.sh` y por efecto sólo imprimirá nuestro nombre de usuario (USER) y una línea vacía. Pero si ejecutamos:

`MY_VARIABLE=1234 ./test.sh`

En este caso imprimirá nuestro nombre de usuario seguido de 1234. Pero si escribimos `env` después MY_VARIABLE no aparecerá entre nuestras variables de entorno. Acabamos de crear y usar una variable de entorno efímera.

Desde node podemos acceder a todas las variables de entorno desde el objecto `process.env` que en mi caso (ejecutando node en un Mac es así):

```js
{
  TERM_SESSION_ID: 'w0t1p0:3AE03DBA-94A0-44E7-85CC-93EDDBD297B1',
  SSH_AUTH_SOCK: '/private/tmp/com.apple.launchd.0c6i8nwtBe/Listeners',
  LC_TERMINAL_VERSION: '3.3.9',
  COLORFGBG: '15;0',
  ITERM_PROFILE: 'Default',
  XPC_FLAGS: '0x0',
  PWD: '/Users/berto/Temp',
  SHELL: '/bin/zsh',
  LC_CTYPE: 'UTF-8',
  TERM_PROGRAM_VERSION: '3.3.9',
  TERM_PROGRAM: 'iTerm.app',
  PATH: '/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin',
  LC_TERMINAL: 'iTerm2',
  COLORTERM: 'truecolor',
  TERM: 'xterm-256color',
  HOME: '/Users/berto',
  TMPDIR: '/var/folders/tc/kzc94qh976bcwlq74p106wpr0000gn/T/',
  USER: 'berto',
  XPC_SERVICE_NAME: '0',
  LOGNAME: 'berto',
  ITERM_SESSION_ID: 'w0t1p0:3AE03DBA-94A0-44E7-85CC-93EDDBD297B1',
  __CF_USER_TEXT_ENCODING: '0x1F5:0x0:0x0',
  SHLVL: '1',
  OLDPWD: '/Users/berto',
  ZSH: '/Users/berto/.oh-my-zsh',
  PAGER: 'less',
  LESS: '-R',
  LSCOLORS: 'Gxfxcxdxbxegedabagacad',
  _: '/usr/local/bin/node'
}
```

Al ser un objeto podemos acceder a cualquiera de estas variables como accedemos a cualquier propiedad de un objeto:

```js
console.log(process.env['PATH'];
//imprimirá: /usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
```

Estas variables de entorno son muy útiles para pasarle parámetros de configuración a un proceso de node, como por ejemplo el usuario y contraseña de la base de datos:

`MYSQL_USER=root MYSQL_PASS=123456 node app.js`

De esa forma evitamos tener esa información delicada escrita en ningún fichero de texto que pueda ver otra gente.

Para evitar que el comando quede guardado en el historial de comandos del terminal (se puede ver usando el comando `history`) podemos poner un espacio antes del comando. Todos los comandos que empiecen por un espacio funcionarán igual pero no se guardarán en el `history`.

### Gestión de argumentos

Vimos previamente que los comandos de terminal aceptan una serie de argumentos, por ejemplo cuando ejecutamos `node app.js 33 blue monkey` le estamos pasando al comando node los argumentos app.js, 33 y monkey.

Podemos acceder a eses argumentos dentro de un programa de node usando el `process.argv` que es un array que contiene todos los argumentos con los que se ejecutó el proceso actual de node, siendo los dos primeros el propio path del ejecutable de node y el path del script (app.js en este caso). Podemos verlo si creamos un fichero app.js con estes contenidos:

```js
console.log(process.argv);
```

y ejecutamos app.js así:

```node app.js movida parda loca```

nos dará el siguiente resultado (los dos primeros elementos serán diferentes en vuestro caso):

```
[
  '/usr/local/Cellar/node/13.12.0/bin/node',
  '/Users/berto/Temp/app.js',
  'movida',
  'parda',
  'loca'
]
```

Si queremos un array sólo con los argumentos que nos interesan podemos crearlo de esta forma:

```js
[,,...args] = process.argv;

console.log(args); //ya no tendrá los dos primeros
```

o de forma más tradicional:

```js
const args = process.argv.slice(2);

console.log(args); //tampoco tendrá los dos primeros
```