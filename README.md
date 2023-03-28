<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>



# Como incializar la app
1. Instala los paquedes de node
```
npm i
```
2. inicia el contendor de docker
```
docker-compose up -d
```
1. Inicia el servidor
```
npm run start:dev
```
# Como usar:
1. Debes registrate para poder tener un token de acceso
* Para eso usa las rutas que te salen en el inicio del servidor 

usa la ruta:
http://localhost:3000/api/v1/usuarios/register_admin

para registrar un administrador: de esta manera debe ser el objeto que debe enviar:
{
  "nombre": "Esteban",
  "apellido": "Mejia",
  "password": "esteban123",
  "correo": "esteban@gmail.com",
  "nro_de_documento": "1007134222"
}
