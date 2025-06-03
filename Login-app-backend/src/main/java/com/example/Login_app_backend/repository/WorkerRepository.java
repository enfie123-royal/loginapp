package com.example.Login_app_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Login_app_backend.model.Worker;

public interface WorkerRepository extends JpaRepository<Worker, String> {
	// Define any custom query methods if needed
	// For example, you might want to find workers by their role or status
	// List<Worker> findByRole(String role);

}
