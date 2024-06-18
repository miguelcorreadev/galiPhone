# GaliPhone

## Requirimientos

For building and running the application you need:

- [JDK 17](https://www.oracle.com/co/java/technologies/javase/jdk11-archive-downloads.html)
- [Maven 3](https://maven.apache.org)
- PostgreSQL

Necesitará configurar su base de datos o crear una base de datos con la siguiente configuración
```
spring.datasource.url=jdbc:postgresql://localhost:5432/galiphone
spring.datasource.username=postgres
spring.datasource.password=postgres
```
## Ejecutar la aplicación localmente

Existen varias formas de ejecutar una aplicación Spring Boot en la máquina local. Una forma es ejecutar el método `main` en la clase `galidev.galiphone.mc.GaliPhoneApplication` desde su IDE.

Alternativamente, puede usar el [complemento Maven de Spring Boot](https://docs.spring.io/spring-boot/docs/current/reference/html/build-tool-plugins-maven-plugin.html) de la siguiente manera:

```shell
mvn spring-boot:run
```
### Running port
- default spring boot config
  http://localhost:8084/

## Docker-compose
Antes de iniciar la aplicación tendremos que ejecutar o levantar el docker-compose para iniciar el contenedor de PostGres.
```shell
docker-compose up -d (Levantar docker-compose)
         o
docker-compose down (Parar docker-compose)
