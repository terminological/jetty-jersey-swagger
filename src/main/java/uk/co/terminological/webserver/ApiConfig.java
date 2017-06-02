package uk.co.terminological.webserver;

public class ApiConfig {

	private ApiConfig(String apiName, String apiDescription, String apiVersion, int port, String apiPath, String docPath) {
		super();
		this.apiDescription = apiDescription;
		this.apiName = apiName;
		this.apiVersion = apiVersion;
		this.port = port;
		this.apiPath = apiPath;
		this.docPath = docPath;
	}
	
	public static ApiConfig from(String apiName, String apiDescription, String apiVersion, int port, String apiPath, String docPath) {
		return new ApiConfig(apiName, apiDescription, apiVersion, port, apiPath, docPath);
	}
	
	public static ApiConfig from(String apiName, String apiDescription, String apiVersion, int port) {
		return new ApiConfig(apiName, apiDescription, apiVersion, port, "/api/", "/doc/");
	}
	
	public static ApiConfig from(String apiName, String apiDescription, String apiVersion) {
		return new ApiConfig(apiName, apiDescription, apiVersion, 8080, "/api/", "/doc/");
	}

	private String apiDescription;
	private String apiName;
	private String apiVersion;
	private String apiPath;
	private String docPath;
	private int port;
	private Class<?>[] classes;
	private String packageName;
	
	// Getters
	protected int getPort() {
		return port;
	}
	
	protected String getApiVersion() {
		return apiVersion;
	}
	
	protected String getApiName() {
		return apiName;
	}
	
	protected String getApiDescription() {
		return apiDescription;
	}

	protected Class<?>[] getClasses() {
		return classes;
	}

	protected String getPackageName() {
		return packageName;
	}

	protected String getDocPath() {
		return docPath;
	}
	
	protected String getApiPath() {
		return apiPath;
	}
	
	// Fluent
	public ApiConfig withEndpoints(Class<?>... classes) {
		this.classes = classes;
		return this;
	}

	public ApiConfig withPackageName(String packageName) {
		this.packageName = packageName;
		return this;
	}
	
}
