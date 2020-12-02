# HTTP

- Introducción a como funcionan los servidores web
- IP, DNS, Puertos, formato de las URLs
- Protocolo HTTP y servidores HTTP
- Módulo http de node

## Introducción a como funcionan los servidores web

Internet es una red masiva de ordenadores interconectados que intercambian datos siguiendo el protocolo TCP/IP.

Cada ordenador conectado está conectado a la red mediante un dispositivo de red que envía información dividida en pequeños paquetes de datos mediante impulsos eléctricos que viajan siguiendo un camino principalmente a través de cables y routers para llegan ao otros dispositivos de red donde son procesados.

El protocolo TCP/IP establece una serie de reglas para la transmisión de eses paquetes de datos. La parte IP establece como se divide la información múltiples paquetes y el destino de cada uno de ellos y el protocolo TCP se encarga de hacer las comprobaciones necesarias para saber que la transmisión se realizó correctamente.

Esta combinación entre hardware y software crea una _packet routing network_ donde es posible esta transferencia de paquetes a través de una red masiva de routers interconectados. Un router es un dispositivo con una dirección IP que se encarga de recibir paquetes con un destino y rebotarlos por el mejor camino para llegar a ese destino en base a una serie de información sobre el estado de la red que se intercambian entre ellos como un sistema de tráfico gigantesco.

Podemos usar el comando `traceroute` para ver el camino que recorre la información que enviamos desde nuestro ordenador para llegar al destino. Este camino puede variar en base a al estado de la red en cada momento.

Estos routers que garantizan el tráfico de internet pertenecen a gobiernos, empresas y otros organismos y trabajan entre ellos en base a una serie de acuerdos de intercambio de tráfico que garantizan que la información pueda llegar a cualquier punto de la red incluso aunque un router deje de funcionar.

Cuando se transmite información entre un ordenador y otro conectado a la red, por ejemplo enviando un formulario de login, cargando una imagen de una web o enviando un mail esa información se divide en múltiples paquetes de tamaño muy pequeño que son fáciles de manejar. Cada uno de eses paquetes tiene una dirección de destino y son enviados para ser manejados por los router intermedios hasta ese destino. El protocolo IP que se encarga de este despiece y envío no tiene garantía que los paquetes lleguen al destino en el orden en que fueron enviados, ni siquiera que lleguen todos. Es el protocolo TPC el que se encarga de reconstruír la información y pedir de nuevo los paquetes que no llegaron porque ocurrió algo llamado _packet loss_ (por ejemplo, porque un router estaba sobrecargado y decidió pasar de algunos paquetes).

El destino de los paquetes se establece mediante direcciones IP que son unas series de números únicos que tienen todos los ordenadores conectados a Internet y que establecen inequívocamente una identidad. Hay dos estándares IPv4 que establece direcciones con formato de 4 grupos de números que van entre 0 y 255, por ejemplo: 212.70.125.1 y soporta 2<sup>32</sup> (más o menos 4 billones) de direcciones diferentes (no todas disponibles para internet). Pero en los últimos años estas direcciones se estan acabando y por ello se estableció un nuevo estándar llamado IPv6 que establece direcciones más complejas, por ejemplo: 2607:f0d0:1002:0051:0000:0000:0000:0004 y que soporta 2<sup>128</sup> (340 sextillones de direcciones). El proceso de cambio de IPv4 a IPv6 está actualmente en marcha.


### DNS

Las direcciones IP son muy fáciles de manejar para routers y ordenadores pero son poco humanas por ello se estableció desde los primeros tiempos de internet un sistema llamado DNS (Domain Name System) que establece una relación entre nombres de dominio formados por palabras y direcciones IP. Por ello cuando ponemos un dominio, por ejemplo: google.com en nuestro navegador lo primero que hace el ordenador es usar el sistema DNS para convertir ese dominio en la dirección IP asociada y empezar la transferencia de datos usando esa dirección.

El sistema DNS es una base de datos descentralizada de relación entre nombres de dominio y direcciones IP, los servidores DNS tienen una dirección IP a la que los ordenadores le hacen constantemente preguntas sobre las direcciones reales de los dominios. 

Este sistema de nombres está organizado en dominios de varios niveles, los *top level domains* son los dominios .com, .net, .org, .es, .gal y estes dominios están gestionados por la [Internet Assigned Numbers Authority](https://en.wikipedia.org/wiki/Internet_Assigned_Numbers_Authority) que se encarga de gestionar los *root servers*, una serie de servidores de DNS masivos en internet que se encargan de llevar el registro de todos los dominios que dependen de estos de primer nivel. Estos son los dominios de segundo nivel, por ejemplo en **google.com** el dominio de segundo nivel sería **google** y el registro de estes dominios es mayoritariamente comercial gestionado por diferentes organizaciones y gobiernos de todo el mundo.

Los dominios de tercer nivel y siguientes son los llamados genericamente subdominios y no están sujetos a limitaciones por lo que si una persona posee un dominio de segundo nivel puede crear los dominios de tercer nivel que desee sin intermediarios usando la propia configuración de DNS de su proveedor.

### Host

Un host en internet es llamado a un ordenador conectado permanentemente a la red con una dirección IP siempre igual a la cual está asociada un nombre de dominio (un conjunto de dominio de primer nivel + segundo, y opcionalmente un tercero, cuarto, etc...).

Los hosts tienen un sistema operativo que ejecutan una serie de aplicaciones que se encargan de gestionar peticiones, las peticiones son trozos de información que vimos antes que llegaban en múltiples paquetes gestionados por el protocolo TCP/IP mediante impulsos eléctricos al dispositivo de red del ordenador y que el kernel se encarga de recomponer usando las reglas del protocolo y redirigir a la aplicación correcta para gestionarlos estableciendo un intercambio de datos.

Este intercambio se llama comunicación entre cliente y servidor donde una aplicación en un ordenador se encarga de contestar peticiones realizadas por un cliente.

Los hosts pueden recibir miles de peticiones de muchos tipos cada segundo y para ordenar esa llegada las peticiones se realizan a los llamados puertos del servidor, una convención numérica que establece una serie de entradas posibles de datos y cada entrada normalmente está gestionada por una aplicación, por ejemplo:

|Puerto | Aplicación |
|-|-|
|80|Servidor web (http)|
|443|Servidor web seguro (https)|
|22|Shell seguro (ssh)|
|20/21|Transmisión de ficheros (ftp)|

y muchos [otros puertos](https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers).

## Servidores web y protocolo HTTP

Un servidor web es un software ejecutándose en un host que atiende peticiones HTTP, estas peticiones llegan al host a través del puerto 80 o el 443. Estas peticiones son realizadas principalmente por navegadores.

Las peticiones HTTP intercambian información entre un cliente y un servidor a través de URLs, por ejemplo: Un navegador le pide a un host a través del puerto 80 que le mande el contenido que hay en la ruta `/css/style.css`.

En el ejemplo anterior esta sería la URL completa: `https://dominio.com:443/css/style.css`. Y por partes sería:

- `https://` Establece el protocolo, HTTP seguro (encriptado) en este caso.
- `dominio.com`: este sería el nombre del host. 
- `:443`: este sería el puerto, al ser tan común casi nunca se establece explicitamente pero internamente se añade de forma transparente para el usuario.
- `/css/style.css`: esta sería la ruta.

Esta petición se realiza usando el protocolo HTTP que establece como se comunican el cliente que inicia la petición con el servidor que la recibe, procesa y da una respuesta que el cliente recibe y la representa en base a configuración de esta respuesta.

El protocolo HTTP se usa para definir peticiones y respuestas. Es un protocolo simple pero extensible. Está basado en texto y tiene la forma de pequeños archivos con un formato específico que usan los navegadores y servidores de forma transparente al usuario. Por ejemplo la petición web que crearía internamente nuestro navegador y transmitiría por la red para la URL especificada anteriormente sería

```
GET /css/style.css HTTP/1.1
Host: dominio.com
Accept-Language: en
Connection: Keep-Alive
```

Por partes sería:
- **GET**: esto es el método, el método GET le dice al servidor que me de lo que hay en la URL. Hay otros métodos como POST que le diría al servidor que recogiera la información que le mando (se utilizaría por ejemplo para enviar formularios)
- **/css/style.css**: esto sería la ruta que le dice al servidor que responda con lo que tenga configurado para responder en esta ruta. Probablemente será un texto con reglas CSS.
- **Host:** cabecera obligatoria que indica el nombre del servidor a donde se dirige la petición.
- **HTTP/1.1**: establece la versión exacta del protocolo que tienen que usar. HTTP 1.1 es el más común pero existe HTTP 2.0 que es una versión más moderna.
- Host: es una cabecera que establece el host al que se tiene que conectar.
- **Accept-Language**: es una cabecera que le dice al servidor el idioma humano en el que está configurado para que (si es el caso) responda con contenido en ese idioma. En este caso sería ignorado ya que el idioma del navegador no afecta al CSS.
- **Connection**: es otra cabecera que indica que se intente mantener abierta la conexión TCP/IP que se creó evitar crear otra y optimizar transmisiones futuras.

![Anatomía de una petición](https://mdn.mozillademos.org/files/13687/HTTP_Request.png)

Por lo tanto la anatomía básica de una petición HTTP es el método, la ruta, la versión del protocolo y una serie de cabeceras mayoritariamente opcionales (excepto Host) que determinan metainformación sobre la petición. Veremos en el futuro que en las peticiones después de las cabeceras podremos establecer un **body**.

La respuesta del servidor tendrá una forma parecida a esta:

```
HTTP/1.1 200 OK
Date: Mon, 27 Apr 2020 11:28:02 GMT
Server: nginx
Content-Length: 9743
Content-Type: text/css

* { margin:0; padding: 0} body { background: red } ....
```

y tendría este formato:

- HTTP/1.1: establece de vuelta la versión del protocolo.
- 200: código de estado. El protocolo HTTP establece una serie de _status code_ que definen el resultado de la petición, 200 significaría que el servidor procesó bien la petición y manda esta respuesta de vuelta, 404 establece que el servidor no tiene nada configurado para responder para la ruta pedida o 500 que dice que hubo un error construyendo la respuesta.
- OK: es la versión en texto del código anterior.
- Date: es una cabecera que define el dia y hora de la respuesta.
- Server: es una cabecera opcional que da información sobre el software del servidor.
- Content-Length: una cabecera que determina el tamaño en bytes del _body_ de la respuesta.
- Content-Type: una cabecera que establece el [Mime Type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) una serie de códigos estandar que determinan el tipo y formato del documento y le dirán al navegador como mostrarlo. En este caso el navegador sabrá que el contenido es de tipo css.
- Al final de las cabeceras viene el **body** que determina el contenido real de la respuesta, en este caso texto CSS pero podría ser HTML, json o contenido binario si fuera una imagen.

![Anatomía de una respuesta](https://mdn.mozillademos.org/files/13691/HTTP_Response.png)

## Enviando información al servidor

El trabajo de programación de backend se resume en programar respuestas para peticiones. En algunos casos la respuesta será enviar un fichero que existe en el disco del servidor (como por ejemplo hace browser-sync) pero en otros casos será hacer una consulta a una base de datos y devolver los resultados en un JSON.

En muchos de estes casos será necesario mandar una serie de parámetros desde el cliente al servidor, en general cuando queremos hacer un envío de datos al servidor hacemos una petición que usa el método POST que indica al servidor que vamos a enviar datos, veremos esto más abajo. 

### GET

Las peticiones GET que son las más tradicionales también puedes enviar datos al servidor y para ello usan la propia ruta de la url, concretamente una parte de ella llamado querystring.

https://dominio.com/buscar/?cadena=Texto&results=100

aquí tenemos:

- Protocolo: https://
- Host: dominio.com
- Ruta: /buscar/
- QueryString: ?cadena=Texto&results=100

El querystring es una sucesión de `variable=valor` separados entre ellos por `&` y todo ello separado de la ruta por una `?`. 

Los formularios HTML que tengan la propiedad _method="GET"_ envían los valores de sus campos usando el querystring.

En el servidor tenemos que procesar este `querystring` y convertirla a un objeto similar a este:

```js
{
	cadena: "Texto",
	results: 100
}
```

estes datos los usaríamos para configurar la respuesta.

Este querystring está incluída en la URL por lo que es completamente visible en cada petición y está limitada al límite de caracteres de cada URL (que es muy grande pero depende del navegador) por lo que no es recomendable para enviar datos de los que no controlemos el tamaño.

Normalmente se usan querystrings para crear URLs que sean facilmente compartibles, por ejemplo los resultados de búsqueda de Google.

El texto que se manda en los querystrings está formateado con [URL encoding](https://en.wikipedia.org/wiki/Percent-encoding) que transforma determinados caracteres en otros para hacerlos seguros para urls (por ejemplo, los espacios).

En node procesaremos estos querystrings con el core module `querystringwww`.

### POST

El método tradicional de enviar información desde el cliente al servidor web son las peticiones con método POST (veremos más métodos de peticiones en el futuro similares). Estas peticiones al igual que las respuestas tienen **body**: una serie de información textual después de las cabeceras que contiene la petición a enviar y que el servidor tiene que procesar al igual que el querystring.

Usando unicamente HTML sólo podemos hacer peticiones con el método POST usando formularios. Los formularios pueden hacer dos tipos de peticiones POST: *x-www-form-url-encoded* y *multipart/form-data*. Este tipo de peticiones se diferencian por la cabecera de la petición "Content-type".

#### x-www-form-url-encoded

Los formularios HTML con el método POST por defecto, si no se indica lo contrario (ver la siguiente sección) crean un body de este tipo, que basicamente es igual que un querystring pero en lugar de añadirse en la URL se añade en el **body** de la petición. Al igual que el querystring está formado por una serie de _clave=valor_ separado por _&_ y formateado mediante URL encoding.

Un ejemplo de petición sería este:

```
POST / HTTP/1.1
Content-Type: application/x-www-form-urlencoded; charset=utf-8
Host: localhost:8080
Content-Length: 31

name=Berto&email=berto%40ber.to
```

#### multipart/form-data

Este tipo de envío se realiza cuando a un formulario HTML se define el atributo `enctype` de esta forma:

```html
<form action="/route" method="POST" enctype="multipart/form-data">
```

esto creará una petición con el content type de esta forma:

```
POST / HTTP/1.1
"content-type": "multipart/form-data; boundary=--------------------------669555521526198327590743",
Host: localhost:8080
Content-Length: 31

----------------------------825158381560649821709544
Content-Disposition: form-data; name="name"

Berto

----------------------------825158381560649821709544
Content-Disposition: form-data; name="image"; filename="minifile.txt"
Content-Type: text/plain

lorem ipsum

----------------------------825158381560649821709544--
```

La característica principal de este tipo de envíos es que está dividido en partes (chunks) que se envían secuencialmente al servidor en diferentes peticiones haciéndolo más óptimo para envíos de ficheros binarios. En el header `content-type` de la petición aparte de especificar que el **body** es de tipo "multipart/form-data" se indica la cadena de texto que divide cada parte de la petición y vemos que el body está dividido en trozos que están separados por esa cadena de texto.

#### Raw

Las peticiones con método POST también permiten enviarse con un header `content-type` libre, que simplemente indica el tipo de datos a enviar. Las más habituales son las peticiones con `content-type: application/json` que contienen un JSON en el body. El servidor web en estes casos simplemente tiene que mirar este header y procesar el body de la petición según su valor.

Un ejemplo:

```
POST / HTTP/1.1
Content-Type: application/json; charset=utf-8
Host: localhost:8080
Content-Length: 16

{"name":"Berto"}
```

## El módulo `http` de Node

El módulo `http` de node es un _core module_ que permite realizar muchas operaciones relacionadas con las peticiones `http`. 

Vamos a ver como permite crear un servidor web que atienda a peticiones HTTP y permita construír respuestas.

Para construír un servidor HTTP importamos el módulo `http` y usamos el método `.createServer`:

```js
const http = require('http');

const server = http.createServer();

server.listen(3000);
```

en este punto ya tenemos un servidor web funcionando en el ordenador que está escuchando peticiones en el puerto 3000.

Ahora sólo le tenemos que decir que cuando reciba una petición ejecute una función:

```js
const http = require('http');

const server = http.createServer();

server.on('request', (request, response) => {
	//aquí van a ocurrir cosas
});

server.listen(3000);
```

Basicamente cada vez que una petición HTTP llegue al servidor se va a ejecutar la función indicada a la que automáticamente Node le va a pasar dos parámetros con los que tenemos que trabajar:

- `request`: objeto con información sobre la **request**
- `response`: objeto con información sobre la **response** que vamos a enviar (incialmente vacía, pero la llenaremos de cosas antes de enviarla)

Del objeto request vamos a sacar toda la información de la petición. Como vimos antes las partes más importantes de una petición definen los siguientes aspectos:

- método
- ruta (aquí se incluye el querystring si lo hay)
- headers
- body (si lo hay)

El método, ruta y headers es facilmente accesible ya que son propieades del objeto request:

```js
server.on('request', (request, response) => {
	const method = request.method;
	const route = request.url
	const headers = request.headers;
	
	//Por ejemplo:
	console.log(method); //GET
	console.log(route); // /noticias.html
	console.log(headers['Accept-Language']); // es
});
```

el body es ligeramente más complicado de procesar ya que no se garantiza que llegue todo al mismo tiempo, vimos que el body de las peticiones POST con un header de `content-type: multipart/form-data` llegan en partes por lo que tenemos que procesarlo por partes, por seguridad:

```js
server.on('request', (request, response) => {
	
	const bodyParts = [];
	
	request.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    bodyParts(chunk);
  }).on('end', () => {
    const bodyComplete = Buffer.concat(bodyParts).toString();
    // ahora ya tenemos el body completo
  });
});
```

de esta forma ya tenemos toda la información necesaria para construír una respuesta. 

Para construirla primero recordamos cuales son las características que definen una respuesta HTTP:

- _status code_: un código que determina si la respuesta fue correcta o no. 200 significa ok, 404 significa Not Found, 500 significa "Internal server error", etc...
- _headers_: una serie de headers que determinan metainformación de la respuesta, la mayoría opcionales.
- _body_: el contenido de la respuesta.

Para establecer el status code simplemente establecemos la propiedad de `response`:

`response.statusCode = 200;`

Para establecer los headers, usamos el método `setHeader`;

```
response.setHeader('Content-type', 'text/html');
response.setHeader('Content-length', 234'); // el .length del body
...
```

y el body podemos ir escribiéndolo por partes si queremos usando el método `.write` lo que iría enviando por partes la respuesta al cliente e indicar que ya no hay más respuesta con el método `.end`:

```
response.write('<html>');
response.write('<body>');
response.write('<h1>Hello, World!</h1>');
response.write('</body>');
response.write('</html>');
response.end(); //Esto enviaría la respuesta al cliente con el contenido anterior
```

o bien podemos escribirlo y enviarlo todo de golpe con el método `.end`:

`response.end('<html><body><h1>Hello, World!</h1></body></html>');`