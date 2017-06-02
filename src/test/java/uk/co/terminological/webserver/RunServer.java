package uk.co.terminological.webserver;

import uk.co.terminological.webserver.api.EntityBrowser;

/**
 * An example of the fluent configuration of an API and static web server.
 * 
 * This is the minimum config needed to set up an API webserver
 * @author rc538
 *
 */
public class RunServer {

	public static void main(String[] args) throws Exception {
		ApiServer server = ApiServer.run(
			ApiConfig
				.from(
					"Test Api", // API name
					"A test api", // API description
					"1.0" // API Version
					/* Other options are available including 
					 * port (default 8080) 
					 * api url base (default "/api/"), 
					 * swagger documentation url base (default "/doc/"
					 */
					)
				.withEndpoints(
					EntityBrowser.class
					// List of JAXRS endpoint classes
				) 
		);
		System.out.println("Server started. press enter to stop...");
		System.in.read();
		server.close();
		System.out.println("Server stopped");
	}

	

}
