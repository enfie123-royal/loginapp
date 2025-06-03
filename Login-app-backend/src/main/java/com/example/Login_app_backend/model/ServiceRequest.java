package com.example.Login_app_backend.model; 

 

import jakarta.persistence.*; 

import java.time.LocalDateTime; 

import java.util.List; 

 

@Entity 

@Table(name = "service_requests") 

public class ServiceRequest { 

 

    



	



	@Id 

    @GeneratedValue(strategy = GenerationType.IDENTITY) 

    private Long id; 

	public Long getId() {
		return id;
	}

    private Long userId; 

    private String userName; 

    private String email; 

    private String assignedWorkerId;
    private String assignedWorkerName;

    public String getAssignedWorkerId() {
		return assignedWorkerId;
	}



	public void setAssignedWorkerId(String id) {
		this.assignedWorkerId = id;
	}



	public String getAssignedWorkerName() {
		return assignedWorkerName;
	}



	public void setAssignedWorkerName(String assignedWorkerName) {
		this.assignedWorkerName = assignedWorkerName;
	}

	@ElementCollection 

    @CollectionTable(name = "service_items", joinColumns = @JoinColumn(name = "request_id")) 

    @Column(name = "service") 

    private List<String> services; 

 

    @Column(columnDefinition = "TEXT") 

    private String description; 

 
    public String getStatus() {
		return status;
	}



	public void setStatus(String status) {
		this.status = status;
	}



	private String status;

    private LocalDateTime requestDate = LocalDateTime.now();







	public Long getUserId() {
		return userId;
	}



	public void setUserId(Long userId) {
		this.userId = userId;
	}



	public String getUserName() {
		return userName;
	}



	public void setUserName(String userName) {
		this.userName = userName;
	}



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



	public LocalDateTime getRequestDate() {
		return requestDate;
	}



	public void setRequestDate(LocalDateTime requestDate) {
		this.requestDate = requestDate;
	} 
	
	
} 