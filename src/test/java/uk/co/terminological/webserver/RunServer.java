package uk.co.terminological.webserver;

import uk.co.terminological.webserver.api.EntityBrowser;

public class RunServer {

	
	public static void main(String[] args) throws Exception {
		ApiServer.run(
			ApiConfig
				.from(
					"Test Api", 
					"A test api", 
					"1.0", 
					9999, 
					"/api/")
				.withClasses(EntityBrowser.class)
		).close();		
	}


}
