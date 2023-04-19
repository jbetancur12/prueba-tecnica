

# Prueba Técnica

Este es el desarrollo de la prueba Técnica. Está en proceso de creación de la documentación en swagger, para verla, una vez seguido los pasos de instalación y el proyecto este online, ingrese a la siguiente url:

`http://localhost:3000/wires/api-doc`

En el proyecto se usó Redis, para almacenar la sección del usuario.

También cuenta con un RefreshToken, para validar si el Access Token aún es válido.

## Stack Usado
- ExpressJS
- TypeScript
- Docker
- Postgress
- TypeORM
- Redis

## Prerequisitos
Es necesario tener instalado:

- Node
- Docker
- Docker-compose


## Instalación

- Clonar el repositorio
```bash
  git clone https://github.com/jbetancur12/prueba-tecnica
  cd prueba-tecnica
```
- Instalar las dependencias

```bash
  npm install 
```
- Llenar el archivo de variables de entorno con los datos requeridos asi:

***Nota: Es importante llenar los datos de la base de datos en este archivo, ya que al ejecutar el contenedor de Docker la imagen tomara estos datos para crear la base de datos***

```
PORT=3000
HOST=localhost
NODE_ENV=development

POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432
POSTGRES_USER=myuser
POSTGRES_PASSWORD=mypassword
POSTGRES_DB=mydb

JWT_ACCESS_TOKEN_PRIVATE_KEY=jwt_access_token_private_key
JWT_ACCESS_TOKEN_PUBLIC_KEY=jwt_access_token_public_key
JWT_REFRESH_TOKEN_PRIVATE_KEY=jwt_refresh_token_private_key
JWT_REFRESH_TOKEN_PUBLIC_KEY=jwt_refresh_token_public_key
```

- Correr el siguiente comando para iniciar la imagen en Docker

`docker-compose up -d`

- Una vez esta iniciada la imagen, correr las migraciones.
 ```bash
 npm run migrate
 npm run db:push
 ```

- Correr el proyecto
```
npm run dev
```
