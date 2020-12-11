# Terminal

- La terminal
- Manejo de procesos
- Git

## La terminal

### Comandos básicos:

Los comandos están compuestos por el nombre del comando + una serie de argumentos: los argumentos que no empiezan por guión son argumentos que requiere el programa para trabajar, por ejemplo `cp test.txt final.txt` en ese caso cp es el comando y recibe dos argumentos "test.txt" y "final.txt", lo que hará será copiar el fichero test.txt en final.txt (creándolo si no existe).

Si los argumentos empiezan por un guión determinan una serie de opciones del comando: `ls -l -a -h` que también se pueden combinar en uno sólo, por lo tanto el comando anterior sería equivalente que `ls -lah`. Ese comando listaría los ficheros del directorio actual, para ver qué hace cada argumento podemos ejecutar `man nombre-del-comando` en este caso `man ls`.

Hay otro tipo de opciones que empiezan por dos guiones y normalmente son versiones largas de las opciones de una letra, por ejemplo el comando sort ordena las lineas de texto de un fichero: `sort test.txt --output=ordenado.txt` ordenará las líneas del fichero test.txt y escribirá el resultado en ordenado.txt.

Hay que tener en cuenta que los sistemas Unix (como Linux) son **case sensitive** por lo que `ls` es diferente a `LS`.

Si queremos ver una lista de los comandos ejecutados recientemente podemos usar el comando `history`. 

### Moviéndose por el sistema de ficheros:

- **pwd**: nos dice en que directorio estamos
- **cd**: cambia de directorio. Podemos usar paths relativos o absolutos. "." siempre se refiere al directorio actual y ".." al directorio anterior. "~" siempre se refiere a nuestro directorio raíz.
- **ls**: nos lista los ficheros y directorios que hay en el directorio actual (o en el que le pasemos por argumentos). Usando la opción `-a` mostrará también archivos y directorios ocultos que en los sistemas Unix son los que empiezan por ".".

### Manipulando ficheros y directorios

- **mkdir**: crea uno o más directorios. Si usamos la opción `-p` los creará recursivamente `mkdir -p dir1/dir2/dir3`
- **rmdir**: borra un directorio (si no está vacío)
- **cp**: copia un fichero en otro (creándolo si no existe) o en otro directorio.
- **mv**: mueve un fichero a otra localización
- **rm**: borra un fichero. Si usamos la opción `-r` borra recursivamente un directorio.

En general cuando los argumentos son ficheros o directorios podemos usar wildcards (*) por lo que `cp ~/Downloads/*.txt ~/Documents` copiará todos los ficheros con la extensión .txt que existan en el directorio Downloads del directorio raíz del usuario al directorio Documents.

**Importante: cuidado con borrar cosas en el terminal ya que aquí no hay “Papelera de Reciclaje” y en general no se puede recuperar nada de lo borrado**

### Redirección
Por defecto el output resultado de un comando se muestra en la pantalla, por ejemplo, al ejecutar el comando `ls` se muestran en pantalla la lista de ficheros y directorios que hay en el directorio actual. 

Podemos redirigir ese output a un fichero en lugar de mostrarlo en pantalla, por ejemplo, ejecutando `ls > output.txt` creará un fichero en el directorio actual con el listado de ficheros y directorios. Esto es lo mismo para cualquier otro comando. Si ejecutamos otro comando, por ejemplo `ps > output.txt` sobre escribirá completamente el fichero con el output del comando `ps` (muestra los procesos activos en el momento, lo veremos mas adelante).

Si en lugar de usar `>` usamos `>>` en lugar de sobre escribir completamente el fichero de destino con el output del comando añadirá el output al final del fichero manteniendo los contenidos anteriores.

### Mostrando el contenido de los ficheros
El comando `cat` muestra en pantalla el contenido del fichero o fichero que le pasemos como argumento: `cat output.txt` o `cat output.txt fichero2.conf`. También podemos usar wildcards (*) `cat *.txt`, este comando mostrará el contenido de todos los ficheros de un directorio. Si combinamos esto ultimo con la redirección nos será muy fácil combinar varios ficheros en uno sólo.

Si el fichero es muy largo y queremos poder avanzar y retroceder en su contenido podemos usar el comando `less`.

Si queremos contar el número de caracteres, palabras o líneas que tiene un fichero podemos usar el comando `wc` que nos mostrará toda esa información si lo ejecutamos sin opciones y podremos usar varias opciones para que muestre sólo un tipo de información.

Para mostrar el número de líneas diferentes que tiene un fichero podemos usar el comando `uniq` que nos mostrará el contenido del fichero (igual que `cat`) pero excluyendo las líneas que se repitan. Si usamos la opción `-d` sólo mostrará las líneas que se repitan.

Los comandos `head` y `tail` mostrarán sólo las 10 primeras o últimas líneas de un fichero respectivamente. Si usamos la opción `-n NUMERO` nos mostrará el NUMERO de líneas indicado, por ejemplo `tail -n 100` mostrará las 100 últimas líneas del fichero.

El comando `grep` permite mostrar las líneas de un fichero si cumplen determinada condición: `grep const main.js` mostrará las líneas del fichero con main.js que contengan la cadena de texto const (diferencia entre mayúsculas y minúsculas). Si queremos que no diferencie entre mayúsculas y minúsculas podemos usar la opción `-i`. Este comando puede buscar en múltiples ficheros usando los wildcards anteriormente mencionados o usando la opción `-r` para que busque recursivamente en varios directorios.

### Un poco de fontanería
De la misma forma que podemos redirigir el output de un comando a un fichero también podemos redirigirlo a otro comando. Por ejemplo, si quisiéramos contar el número de ficheros y directorios que hay en el directorio actual podemos ejecutar los siguientes comandos:

```
ls -l > listado.txt
wc -l listado.txt
rm listado.txt
```

Efectivamente esto nos da el número total de ficheros y directorios pero es bastante trabajo por lo que podemos "pipear" el output del primer `ls -l` directamente al `wc -l` evitando así un paso intermedio. Para hacer esto separamos los dos comandos con la barra vertical "|":

`ls -l | wc -l`

De esa forma el segundo comando recogerá el output del primero como si fuera su input. 

Podremos hacer múltiples pipes, por ejemplo si queremos contar el número de ficheros jpg que tenemos en un directorio lleno de archivos de imagen de muchos formatos podemos hacer: `ls -l | grep jpg | wc -l` así al último `wc` solo llegará un input previamente filtrado por el grep (por supuesto podríamos hacer desde el principio `ls -l *.jpg | wc -l` y sería mucho más sencillo)

### Editando el contenido de los ficheros 

Para crear un nuevo fichero sin contenido o marcar la fecha de última modificación de un fichero al momento actual podemos usar el comando `touch`.

Si queremos hacer una edición rápida de un fichero podemos usar el comando `nano` que es un editor de texto básico pero muy funcional. En la parte inferior de la pantalla tenemos una lista de combinaciones de teclas que nos permiten realizar las operaciones básicas de cualquier editor de texto como cortar, pegar, buscar, guardar, etc...

El comando `sort` nos muestra las líneas de texto de un fichero ordenadas alfabética y numéricamente. Si usamos la opción `-r` lo hará a la inversa.

### Buscando ficheros y directorios

Podemos usar el comando `find` para buscar ficheros y directorios, el primer parámetro es el sitio desde donde buscar y después podemos añadir más parámetros con más criterios de búsqueda, por ejemplo, para buscar ficheros que js en el directorio actual: `find . -name "*.js"`. Hay otras opciones para buscar sólo directorios (`find . -type d -name css`), buscar ignorando mayúsculas y minúsculas (usando -iname en lugar de -name) o por tamaño, fecha de modificación y muchos más criterios.  

## Manejo de procesos

Cada vez que ejecutamos un comando se crea un proceso dentro del sistema que representa ese comando. El sistema tiene normalmente una lista grande de procesos ejecutándose, la mayoria de ellos no los ejecutamos conscientemente nosotros pero otros si. Normalmente los comandos cuando acaban de ejecutarse desaparecen de la lista de procesos, pero hay otros procesos que no acaban hasta que nosostros se lo indicamos, por ejemplo el comando `nano` que vimos antes.

Para ver la lista de procesos que hay ejecutandose en ese momento en el sistema usamos el comando `ps` que mostraría los procesos ejecutándose en este terminal. Usando `ps -a` vemos todos los procesos iniciados por el usuario, y usando `ps -ef` vemos todos los procesos que están corriendo en el sistema.

La primera columna en el output de ps es el PID, un identificador numérico del proceso que que nos servirá para referirnos a el. Otra forma de encontrar el PID de un proceso es usando el comando `pgrep`, por ejemplo si tenemos ejecutando el editor de texto `nano` y queremos encontrar su número de proceso podemos hacer `pgrep nano`.

El comando `top` nos muestra una lista de procesos interactiva que se actualiza en tiempo real pero es muy poco amigable y difícil de usar por lo que nosotros usaremos el comando `htop`, si no lo tenemos instalado podemos hacerlo con el comando `apt install htop`. 

Si queremos parar un proceso manualmente podemos usar el comando `kill` seguido de el PID del proceso. O el comando `killall` seguido del nombre del proceso, hay que tener en cuenta que si tenemos varios procesos del mismo programa el comando `killall` intentará pararlos todos. Estes comandos intentarán parar los procesos de forma segura, comunicándole al programa que el sistema tiene intención de cerrarlos y dándole tiempo para que el programa haga cosas como guardar datos, hacer un backup o cualquier otra cosa. Existen ocasiones que los procesos están en un estado anómalo y no atienden esta petición de cierre y siguen ejecutándose, en estes casos podemos ejecutar `kill -9` seguido del PID lo cual forzará el cierre sin darle oportunidad al proceso de hacer nada.

## Git básico

El programa git lleva un registo de los cambios realizados en los contenidos de un directorio. Registrando todos estes cambios y permitiéndonos cosas como volver a un estado anterior y sincronizar el estado del directorio con servidores remotos como Github o Gitlab.

Para indicar que queremos empezar a registrar los cambios en un directorio ejecutamos el comando `git init` cuando estemos en él mismo. Esto creará un directorio "oculto" que se llama .git que es el que usará git para realizar el registro de los cambios. Acabamos de crear un repositorio git **local**.

Desde este momento podemos seguir creando y modificando ficheros y directorios. Cuando queramos guardar el estado actual lo que haremos será un "commit" para ello tenemos que añadir al commit los ficheros o directorios que queremos usando `git add <fichero/directorio>` o si queremos añadir todo podemos usar `git add *` o `git add .`. En este momento los cambios estarán registrados para hacer un commit en nuestro repositorio git local que siempre tiene que ir acompañado de un mensaje descriptivo: `git commit -m "Mensaje"`.

Si creamos un repositorio remoto donde sincronizar los cambios en Github o Gitlab tenemos que ejecutar los comandos que nos indican esas páginas para indicarle a git que tenemos disponible un repositorio remoto. Para comprobar si tenemos configurado un repositorio remoto podemos ejecutar el comando `git remote -v`.

En caso de tener configurado un repositorio remoto podemos sincronizar los commits que tengamos en nuestro repositorio local usando el comando `git push origin master` (o directamente `git push`), en caso de que lo hagamos la primera vez usaremos `git push -u origin master`.

Una de las características mas útiles de git es poder crear diferentes ramas de trabajo. La rama por defecto en la que trabajamos cuando creamos un repositorio es la rama **master**. Si queremos hacer una rama de trabajo nueva en nuestro directorio (por ejemplo, para probar un cambio en nuestro código que no estamos seguros si va a funcionar) tenemos que ejecutar: `git checkout -b <nombre>` eso también activará esa rama. Para volver a la rama master ejecutamos `git checkout master` y para volver a la otra `git checkout <nombre>`. Para sincronizar esa rama con el repositorio remoto (si tenemos) usamos `git push origin <nombre>`.

Si queremos borrar una rama ejecutamos `git branch -d <nombre>`. Pero si los cambios que realizamos en esa rama finalmente nos convencen y queremos guardarlos en la rama principal tenemos que hacer un **merge**. El merge siempre se hace desde la rama que **va a recibir los cambios** por ejemplo, vamos a la rama master y hacemos `git merge <nombre>`, para hacer esto no puede haber cambios pendientes de hacer commit en ninguna de las dos ramas. 

Cuando hacemos un merge git intentará juntar los cambios automáticamente pero hay veces que no podrá y el merge resultará en un conflicto que tendremos que resolver manualmente editando los ficheros conflictivos y volviéndolos a añadir al merge usando `git add <fichero>`. Siempre podremos ver las diferencias entre las ramas usando `git diff <branch_origen> <branch_destino>`.

Para ver el registro de commit realizados podemos usar el comando `git log`.

Si hacemos algo mal en un fichero y queremos volver a como estaba en el último commit ejecutamos `git checkout -- <fichero>`. Y si queremos revertir todos los cambios en todos los ficheros editados al último commit `git checkout .`.

Si hicimos cambios en el repositorio local así como commits y queremos revertir todo a la última versión en el repositorio remoto (si es que lo tenemos) podemos ejecutar:

```
git fetch origin
git reset --hard origin/master
```
