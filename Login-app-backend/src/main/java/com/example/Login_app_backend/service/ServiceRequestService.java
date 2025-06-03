package com.example.Login_app_backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Login_app_backend.model.ServiceRequest;
import com.example.Login_app_backend.model.Worker;
import com.example.Login_app_backend.repository.ServiceRequestRepository;


@Service
public class ServiceRequestService {

	@Autowired
	private ServiceRequestRepository serviceRequestRepository; // Assuming you have a repository for ServiceRequest
	
	public ServiceRequest addServiceRequest(ServiceRequest serviceRequest) {
		if (serviceRequest.getStatus() == null || serviceRequest.getStatus().trim().isEmpty()) {
	        serviceRequest.setStatus("submitted");
	    }
		return serviceRequestRepository.save(serviceRequest);
	}

	public List<ServiceRequest> getPreviousRequestByEmail(String email) {
		
		return serviceRequestRepository.findAllByEmail(email);
		
	}

	public List<ServiceRequest> getAllServiceRequests() {
		
		return serviceRequestRepository.findAll();
	}

	public Optional<ServiceRequest> getServiceRequestById(Long id) {
		
		return serviceRequestRepository.findById(id);
	}

	public ServiceRequest approveServiceRequest(ServiceRequest serviceRequest, Worker worker) {
	    serviceRequest.setStatus("approved");
	    serviceRequest.setAssignedWorkerId(worker.getId());
	    serviceRequest.setAssignedWorkerName(worker.getName());
	    return serviceRequestRepository.save(serviceRequest);
	}

	public ServiceRequest rejectServiceRequest(ServiceRequest serviceRequest) {
		
		serviceRequest.setStatus("Rejected");
		return serviceRequestRepository.save(serviceRequest);
	}

	public ServiceRequest approveServiceRequest(ServiceRequest serviceRequest, String workerId, String workerName) {
		
		serviceRequest.setStatus("approved");
		serviceRequest.setAssignedWorkerId(workerId);
		serviceRequest.setAssignedWorkerName(workerName);
		return serviceRequestRepository.save(serviceRequest);
		
	}
	


}
