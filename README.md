# jetty-jersey-swagger

A base line configuration for a jetty hosted website with a jax-rs api and swagger documentation coupled to a static file webserver.

The baseline should also allow for bower to install dependencies and webpack 


https://danielflower.github.io/2016/04/01/Swagger-with-embedded-jetty-without-magic.html
https://github.com/SriramKeerthi/swagger-jersey2-jetty/tree/master/swagger-jersey2-jetty/src/main/resources/swaggerui

## Dependencies

- Java 8
- Maven
- npm (sudo apt get install node npm)
- webpack (npm install --save-dev webpack html-webpack-plugin style-loader css-loader csv-loader xml-loader markdown-loader)

## What works

- Possible to serve static files for api client
- CORS and JSON pretty print API output based on JAX-RS classes
- npm install executed on: mvn generate-sources
- front end dependencies via webpack on mvn generate-sources

## What doesn't (yet)

- compiling css / html templates using webpack
- preprocessing phase using webpack to compile static web content

## How to:

### Add java dependencies
add them in maven's pom.xml

### Add javascript dependencies
use npm: npm install --save <scriptname>
or 
add them direct to package.json and perform a mvn generate-sources.

### trigger webpack build. 
use npm start or mvn generate-sources


### interactive webpack development. 
use npm test from root directory

