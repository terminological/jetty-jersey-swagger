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
 * Main Class for starting the Entity Browser
 */
public abstract class ApiServer implements AutoCloseable {
	
	private static final Logger logger = LoggerFactory.getLogger( ApiServer.class );
	private Server server;

	public abstract int getPort();
	public abstract String getApiVersion();
	public abstract String getApiName();
	public abstract String getApiDescription();
	
	public String getApiPath() {return "/api/";}
	
	public ApiServer(String packageName) {
		start(buildApiContext(packageName));
	}
		
	public ApiServer(Class<?>... apiClasses) {
		start(buildApiContext(apiClasses));
	}
	
	private void start(ContextHandler api) {
		try {
			Resource.setDefaultUseCaches( false );
			
			// Start server
			server = new Server( this.getPort() );
			
			final HandlerList handlers = new HandlerList();
			handlers.addHandler( api );
			handlers.addHandler( buildSwaggerUI() );
			handlers.addHandler( buildStatic() );
			
			
			server.setHandler( handlers );
			server.start();
			server.join();
			
		} catch ( Exception e ) {
			logger.error( "There was an error starting up the Entity Browser", e );
			throw new RuntimeException(e);
		}
	}

	 private void registerSwaggerJsonResource(ResourceConfig rc) {
	        new SwaggerContextService()
	            .withSwaggerConfig(new SwaggerConfig() {
	                public Swagger configure(Swagger swagger) {
	                    Info info = new Info();
	                    info.setTitle(ApiServer.this.getApiName());
	                    info.setVersion(ApiServer.this.getApiVersion());
	                    info.setDescription(ApiServer.this.getApiDescription());
	                    swagger.setInfo(info);
	                    swagger.setBasePath(ApiServer.this.getApiPath());
	                    return swagger;
	                }
	                public String getFilterClass() {
	                    return null;
	                }
	            })
	            .withScanner(new Scanner() {
	                private boolean prettyPrint;
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
		entityBrowserContext.setContextPath( this.getApiPath() );
		entityBrowserContext.addServlet( entityBrowser, "/*" );
		return entityBrowserContext;
	}
	
	private ContextHandler buildStatic() throws Exception {
		final ResourceHandler staticResourceHandler = new ResourceHandler();
		staticResourceHandler.setResourceBase( this.getClass().getClassLoader().getResource("static").toURI().toString() );
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
        context.setContextPath("/docs/");
        context.setHandler(rh);
        return context;
    }
	
	public void close() throws Exception {
        server.stop();
        server.join();
        server.destroy();
    }
	
}
