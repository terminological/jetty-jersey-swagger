# jetty-jersey-swagger

A base line configuration for a jetty hosted website with a jax-rs api and swagger documentation coupled to a static file webserver
The baseline should also allow for bower to install dependencies and require.js to 


https://danielflower.github.io/2016/04/01/Swagger-with-embedded-jetty-without-magic.html
https://github.com/SriramKeerthi/swagger-jersey2-jetty/tree/master/swagger-jersey2-jetty/src/main/resources/swaggerui

## Dependencies

- Java 8
- Maven
- npm
- bower.js

## What works

- Possible to serve static files for api client
- CORS and JSON pretty print API output based on JAX-RS classes
- 


## What doesn't (yet)

- compiling html templates using jbake
- http://jbake.org/docs/2.5.1/
- preprocessing phase using maven and freemarker to compile static web content