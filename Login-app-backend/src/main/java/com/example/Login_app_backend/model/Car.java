package com.example.Login_app_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Car {

	@Id
	private Long id;
	
	private String model;
	private int year;
	private String licensePlate;

	@ManyToOne
	private User user;
	
	public Long getId() {
		return id;
	}
	
	public int getYear() {
		return year;
	}
	
	public void setYear(int year) {
		this.year = year;
	}
	
	public String getLicensePlate() {
		return licensePlate;
	}
	
	public void StringsetLicensePlate(String licensePlate) {
		this.licensePlate=licensePlate;
	}
	
	public String getModel() {
		return model;
	}
	
	public void setModel(String model) {
		this.model=model;
	}
	
	public User getUser() {
		return user;
	}
	
	public void setUser(User user) {
		this.user=user;
	}
	
	
}
