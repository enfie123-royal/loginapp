package com.example.Login_app_backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Login_app_backend.model.Car;

public interface Carrepository extends JpaRepository<Car, Long> {

	
	    List<Car> findByUserId(Long userId);
	



}
