package uk.co.terminological.webserver.model;

// @XmlRootElement
public class Entity {
	
	// @XmlElement(name="name")
	private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
