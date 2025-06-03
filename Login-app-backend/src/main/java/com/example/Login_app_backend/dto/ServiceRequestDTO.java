package com.example.Login_app_backend.dto; 

 

import java.util.List; 

 

public class ServiceRequestDTO { 

	
    private String email; 

    private List<String> services; 

    private String description; 

 

    // Getters and Setters 

    public String getEmail() { 

        return email; 

    } 

 

    public void setEmail(String email) { 

        this.email = email; 

    } 

 

    public List<String> getServices() { 

        return services; 

    } 

 

    public void setServices(List<String> services) { 

        this.services = services; 

    } 

 

    public String getDescription() { 

        return description; 

    } 

 

    public void setDescription(String description) { 

        this.description = description; 

    } 

} 