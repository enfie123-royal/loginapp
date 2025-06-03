package com.example.Login_app_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Login_app_backend.repository.WorkerRepository;

@Service

public class WorkerService {

	@Autowired WorkerRepository workerRepository; // Assuming you have a repository for Worker
	public Object getAllWorkers() {
		
		return workerRepository.findAll(); // Fetch all workers from the repository
	}

}
