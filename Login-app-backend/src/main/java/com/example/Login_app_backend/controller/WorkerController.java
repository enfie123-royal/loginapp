package com.example.Login_app_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Login_app_backend.service.WorkerService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/workers")

public class WorkerController {

	@Autowired WorkerService workerService;
	
	
	@GetMapping("/all")
	public ResponseEntity<?> getAllWorkers() {
		return ResponseEntity.ok(workerService.getAllWorkers());
	}
	
}
