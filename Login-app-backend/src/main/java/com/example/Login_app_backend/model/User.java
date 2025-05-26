package com.example.Login_app_backend.model;
 

import java.math.BigInteger;

import jakarta.persistence.*; 

 

@Entity 

@Table(name = "users") 

public class User { 

     

    @Id 

    @GeneratedValue(strategy = GenerationType.IDENTITY) 

    private Long id; 

 

    private String email; 

    private String password; 

    private String name;
 
    private BigInteger phone_number;
    private Integer age;
    private String gender;
    private String address;
    private String username;
    
    

    // Getters and Setters 

   


	public Integer getAge() {
		return age;
	}



	public BigInteger getPhone_number() {
		return phone_number;
	}



	public void setPhone_number(BigInteger phone_number) {
		this.phone_number = phone_number;
	}



	public void setAge(Integer age) {
		this.age = age;
	}



	public String getGender() {
		return gender;
	}



	public void setGender(String gender) {
		this.gender = gender;
	}



	public String getAddress() {
		return address;
	}



	public void setAddress(String address) {
		this.address = address;
	}



	public String getUsername() {
		return username;
	}



	public void setUsername(String username) {
		this.username = username;
	}



	public String getName() {
		return name;
	}



	public void setName(String name) {
		this.name = name;
	}



	public Long getId() { 

        return id; 

    } 

 

    public void setId(Long id) { 

        this.id = id; 

    } 

 

    public String getEmail() { 

        return email; 

    } 

  

    public void setEmail(String email) { 

        this.email = email; 

    } 

  

    public String getPassword() { 

        return password; 

    } 

  

    public void setPassword(String password) { 

        this.password = password; 

    } 

} 