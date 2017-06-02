package uk.co.terminological.webserver;

import java.util.Set;


import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.ContextHandler;
import org.eclipse.jetty.server.handler.HandlerList;
import org.eclipse.jetty.server.handler.ResourceHandler;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.eclipse.jetty.util.resource.Resource;

import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.servlet.ServletContainer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.swagger.config.Scanner;
import io.swagger.config.SwaggerConfig;
import io.swagger.jaxrs.config.SwaggerContextService;
import io.swagger.jaxrs.listing.ApiListingResource;
import io.swagger.models.Info;
import io.swagger.models.Swagger;


/**
 * The ApiServer is a Jetty backed webserver with a set of default behaviours that include static file serving from the 
 * server root out of a "src/main/resources/dist" directory in the jar. 
 */
public class ApiServer implements AutoCloseable {
	
	private static final Logger logger = LoggerFactory.getLogger( ApiServer.class );
	private Server server;
	private ApiConfig apiConfig;
	private ContextHandler apiContext;
	
	// 
	public ApiServer(ApiConfig apiConfig) {
		this.apiConfig=apiConfig;
		if (apiConfig.getPackageName() != null) {
			this.apiContext = buildApiContext(apiConfig.getPackageName());
		} else {
			this.apiContext = buildApiContext(apiConfig.getClasses());	
		}
		start();
	}
	
	public static ApiServer run(ApiConfig apiConfig) {
		return new ApiServer(apiConfig);
	}
	
	private void start() {
		try {
			Resource.setDefaultUseCaches( false );
			
			// Start server
			server = new Server( this.apiConfig.getPort() );
			
			final HandlerList handlers = new HandlerList();
			handlers.addHandler( apiContext );
			handlers.addHandler( buildSwaggerUI() );
			handlers.addHandler( buildStatic() );
			
			server.setHandler( handlers );
			server.start();
			
		} catch ( Exception e ) {
			logger.error( "There was an error starting up the JAX-RS api and web server", e );
			throw new RuntimeException(e);
		}
	}

	 private void registerSwaggerJsonResource(ResourceConfig rc) {
	        new SwaggerContextService()
	            .withSwaggerConfig(new SwaggerConfig() {
	                public Swagger configure(Swagger swagger) {
	                    Info info = new Info();
	                    info.setTitle(ApiServer.this.apiConfig.getApiName());
	                    info.setVersion(ApiServer.this.apiConfig.getApiVersion());
	                    info.setDescription(ApiServer.this.apiConfig.getApiDescription());
	                    swagger.setInfo(info);
	                    swagger.setBasePath(ApiServer.this.apiConfig.getApiPath());
	                    return swagger;
	                }
	                public String getFilterClass() {
	                    return null;
	                }
	            })
	            .withScanner(new Scanner() {
	                private boolean prettyPrint = true;
	                public Set<Class<?>> classes() {
	                	return rc.getClasses();
	                }
	                public boolean getPrettyPrint() {
	                    return prettyPrint;
	                }
	                public void setPrettyPrint(boolean b) {
	                    prettyPrint = b;
	                }
	            })
	            .initConfig()
	            .initScanner();

	        rc.packages(ApiListingResource.class.getPackage().getName());
	    }


	private ContextHandler buildApiContext(String packageName) {
		ResourceConfig resourceConfig = new ResourceConfig();
		resourceConfig.packages( packageName );
		return apiContextHandler(resourceConfig);
	}

	private ContextHandler buildApiContext(Class<?>... classes) {
		ResourceConfig resourceConfig = new ResourceConfig();
		resourceConfig.registerClasses(classes);
		return apiContextHandler(resourceConfig);
	}
	
	private ContextHandler apiContextHandler(ResourceConfig resourceConfig) {
		registerSwaggerJsonResource(resourceConfig);
		//resourceConfig.register(JacksonFeature.class);
		resourceConfig.register(PrettyPrintJacksonWriter.class);
		resourceConfig.register(CORSFilter.class);
		ServletContainer servletContainer = new ServletContainer( resourceConfig );
		ServletHolder entityBrowser = new ServletHolder( servletContainer );
		ServletContextHandler entityBrowserContext = new ServletContextHandler( ServletContextHandler.SESSIONS );
		entityBrowserContext.setContextPath( this.apiConfig.getApiPath() );
		entityBrowserContext.addServlet( entityBrowser, "/*" );
		return entityBrowserContext;
	}
	
	private ContextHandler buildStatic() throws Exception {
		final ResourceHandler staticResourceHandler = new ResourceHandler();
		staticResourceHandler.setResourceBase( this.getClass().getClassLoader().getResource("dist").toURI().toString() );
		final ContextHandler staticContext = new ContextHandler();
		staticContext.setContextPath( "/" );
		staticContext.setHandler( staticResourceHandler );
		return staticContext;
	}

	public ContextHandler buildSwaggerUI() throws Exception {
        ResourceHandler rh = new ResourceHandler();
        rh.setResourceBase(ApiServer.class.getClassLoader()
            .getResource("META-INF/resources/webjars/swagger-ui/2.1.4")
            .toURI().toString());
        ContextHandler context = new ContextHandler();
        context.setContextPath( this.apiConfig.getDocPath() );
        context.setHandler(rh);
        return context;
    }
	
	public void close() throws Exception {
        server.stop();
        server.join();
        server.destroy();
    }
	
}
