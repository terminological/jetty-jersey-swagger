package uk.co.terminological.webserver;

import uk.co.terminological.webserver.api.EntityBrowser;

public class RunServer extends ApiServer {

	
	public static void main(String[] args) throws Exception {
		new RunServer(EntityBrowser.class).close();
	}
	
	public RunServer(Class<?>... apiClasses) {
		super(apiClasses);
	}

	@Override
	public int getPort() {return 9999;}

	@Override
	public String getApiVersion() {return "1.0";}

	@Override
	public String getApiName() {return "Test api";}
	
	@Override
	public String getApiDescription() {return "A test api";}
	

}
