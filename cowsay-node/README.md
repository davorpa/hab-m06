# cowsay-node

## Table of Contents

- [cowsay-node](#cowsay-node)
  - [Table of Contents](#table-of-contents)
  - [Requirements](#requirements)
  - [Initialization](#initialization)
  - [Available commands](#available-commands)

## Requirements

**NodeJS 12.x**. https://nodejs.org

1. se puede instalar globalmente mediante:
```shell
> sudo apt install nodejs
```
2. o a través de sus paquetes de NodeSource:
  https://github.com/nodesource/distributions
```shell
# Instalamos el software previo
> sudo apt install curl

# Descargamos el paquete, cargandolo en la sesion bash
> sudo curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -

# y lo instalamos tomando la caché bash como fuente
> sudo apt install -y nodejs
```
3. también mediante su gestor de versiones **nvm** el cual nos permite una mayor flexibilidad.
  https://github.com/nvm-sh/nvm
  - Tener varias versiones instaladas a la vez e ir cambiando entre ellas según requisitos.
  - Es útil sobre todo si andamos desarrollando varios proyectos con código legacy.
  - No necesitar permisos de superusuario (root), porque su estructura de ficheros se guarda en nuestro `$HOME`.

## Initialization

1. Por la terminal ejecutamos en orden los siguientes comandos:
    ```shell
    # Instalamos los módulos de node
    > npm install
    ```
2. Copia el fichero `.env.example` y renómbralo a `.env` rellenando las propiedades de entorno definidas en el mismo con los valores deseados.

## Available commands

1. Arranca la aplicación:
    ```shell
    > npm start
    ```
    O en modo debug
    ```shell
    > npm run start:debug
    ```
2. Arranca la aplicación en modo desarrollo (con soporte para refresco de código en caliente):
    ```shell
    > npm run dev
    ```
3. Realiza los test unitarios:
    ```shell
    > npm test
    ```
4. Comprueba la calidad de código (`linting`):
    ```shell
    > npm lint
    ```
5. Comprueba y arregla (si es posible) los errores reportados por el `linter`:
    ```shell
    > npm lint:fix
    ```
