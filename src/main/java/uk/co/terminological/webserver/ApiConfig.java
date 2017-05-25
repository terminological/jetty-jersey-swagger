package uk.co.terminological.webserver;

public class ApiConfig {

	private ApiConfig(String apiName, String apiDescription, String apiVersion, int port, String apiPath) {
		super();
		this.apiDescription = apiDescription;
		this.apiName = apiName;
		this.apiVersion = apiVersion;
		this.port = port;
		this.setApiPath(apiPath);
	}
	
	public static ApiConfig from(String apiName, String apiDescription, String apiVersion, int port, String apiPath) {
		return new ApiConfig(apiName, apiDescription, apiVersion, port, apiPath);
	}

	private String apiDescription;
	private String apiName;
	private String apiVersion;
	private String apiPath;
	private int port;
	private Class<?>[] classes;
	private String packageName;
	
	// Getters
	public int getPort() {
		return port;
	}
	
	public String getApiVersion() {
		return apiVersion;
	}
	
	public String getApiName() {
		return apiName;
	}
	
	public String getApiDescription() {
		return apiDescription;
	}

	public Class<?>[] getClasses() {
		return classes;
	}

	public String getPackageName() {
		return packageName;
	}

	// Setters
	public void setApiDescription(String apiDescription) {
		this.apiDescription = apiDescription;
	}

	public void setApiName(String apiName) {
		this.apiName = apiName;
	}

	public void setApiVersion(String apiVersion) {
		this.apiVersion = apiVersion;
	}

	public void setPort(int port) {
		this.port = port;
	}
	
	// Fluent
	public ApiConfig withClasses(Class<?>... classes) {
		this.classes = classes;
		return this;
	}

	public ApiConfig withPackageName(String packageName) {
		this.packageName = packageName;
		return this;
	}

	public String getApiPath() {
		return apiPath;
	}

	public void setApiPath(String apiPath) {
		this.apiPath = apiPath;
	}
	
}
