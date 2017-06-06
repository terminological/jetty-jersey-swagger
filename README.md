# jetty-jersey-swagger

A base line "JAM stack" jetty hosted website with a jax-rs api backend with swagger documentation, and a js frontend webserver, packaged by webpack2. Focus is on producing content using markdown, supported by images and client side visualisations created with e.g. d3, backed by static or dynamic data from the baskend api. Purpose is getting something lightweight up and running as quick as possible, without dependencies on large framework e.g. spring. Developed as a server for data projects in mind particularly d3 visualisations and to enable rapid development rather than robust performance.

__backend:__

Standalone Jetty, Jersey & Swagger without dependency injection
https://danielflower.github.io/2016/04/01/Swagger-with-embedded-jetty-without-magic.html
https://github.com/SriramKeerthi/swagger-jersey2-jetty/tree/master/swagger-jersey2-jetty/src/main/resources/swaggerui

__frontend:__

Javascript with vanilla npm managing front end dependencies
Webpack2 based dependency packaging 
Templating support for webpack with focus on markdown support, static data file support and minimal html 

## Dependencies

- Java 8
- Maven
- npm (sudo apt get install node npm)
- webpack dependencies defined in package.json (npm install)

## Layout

It is assumed you will be forking this whole project and modifying to build custom behaviour in the file structure described here.  

### Files

- ./pom.xml for backend java dependencies
- ./package.json for frontend javascript dependencies
- ./src/test/java for example JAX-RS API layout & example uk.co.terminological.webserver.RunServer for main entry class.
- ./src/main/resources/webpack.config.js webpack config file and list of served pages
- ./src/main/resources/src/common for common css files
- ./src/main/resources/src/<page_name> for different pages. This is just suggested layout - defined by webpack.config.js
- ./src/main/resources/dist for webpack generated assets and other static generated files.

### URLs

- by default site will be served on port 8080 - see uk.co.terminological.webserver.ApiConfig
- / static files from ./src/main/resources/dist as compiled by webpack - urls available as defined by webpack.config.js
- /api/<jax-rs-endpoint>/<options> default location of api files - can be changed by ApiConfig
- /api/swagger.json or /api/swagger.yaml default swagger api description
- /docs/?url=../api/swagger.json swagger documentation

## What works

- Serve static files for api client from webserver root
- CORS and JSON pretty print API output based on JAX-RS classes from configurable api path
- Swagger self documenting API
- npm install executed on: mvn generate-sources
- front end dependencies via webpack on mvn generate-sources
- compiling css / html templates / markdown using webpack
- support for compile time loading of csv and xml resources
- markdown plugins supported (markdown-it-decorate, markdown-it-sub, markdown-it-sup)
- preprocessing phase using webpack to compile static web content
- webpack-dev-server via npm test for iterative development

## What doesn't (yet)

- Pretty print XML or other API output formats.
- Any form of complex routing or authentication - if you need this you need to do it properly.
- [See this stackoverflow question](https://stackoverflow.com/questions/26777083/best-practice-for-rest-token-based-authentication-with-jax-rs-and-jersey)

## How to:

### Create an API and start server
Write a swagger annotated JAX-RS API endpoint class & any supporting data structures

e.g. src/test/java: uk.co.terminological.webserver package

see: https://github.com/swagger-api/swagger-core/wiki/Annotations-1.5.X


### Add java dependencies
add them in maven's pom.xml the usual way

### Add runtime javascript dependencies
use npm: npm install --save <scriptname>

*or* 

add them direct to package.json and perform a mvn generate-sources.

### Add webpack modules
use npm install --save-dev <scriptname>

### trigger webpack build. 
use *npm start* or *mvn generate-sources*

### interactive webpack development. 

use *npm test* from root directory to start webpack-dev-server on port 9000 - however java API components will not be running.

Possible to run java backend concurrently (e.g. in debug mode) on a different port to interactively develop end to end using webpack-dev-server for front end. webpack-dev-server will forward the port for the api to the java backend server (this assumes backend is running with default port config and paths - see webpack.config.js 

### adding new markdown-it-plugins
- see https://www.npmjs.com/browse/keyword/markdown-it-plugin for other plugins
- need to install with npm install --save-dev <plugin>
- and add require(<plugin>) to webpack.config.js

