package com.example.Login_app_backend.controller; 

 

import com.example.Login_app_backend.dto.ApproveRequestDTO;
import com.example.Login_app_backend.dto.ServiceRequestDTO; 

import com.example.Login_app_backend.model.ServiceRequest; 

import com.example.Login_app_backend.model.User; 

import com.example.Login_app_backend.repository.UserRepository;
import com.example.Login_app_backend.service.ServiceRequestService;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired; 

import org.springframework.http.ResponseEntity; 

import org.springframework.http.HttpStatus; 

import org.springframework.web.bind.annotation.*; 

 

@RestController 

@RequestMapping("/service-requests") 

@CrossOrigin(origins = "http://localhost:4200") 

public class ServiceRequestController { 

 

    @Autowired 

    private ServiceRequestService serviceRequestService; 

 

    @Autowired 

    private UserRepository userRepository; 

 

  @PostMapping("/add")
public ResponseEntity<ServiceRequest> addServiceRequest(@RequestBody ServiceRequestDTO dto) {
    Optional<User> user = userRepository.findByEmail(dto.getEmail());

    if (!user.isPresent()) { // Correctly check if the user is present
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    ServiceRequest request = new ServiceRequest();
    request.setUserId(user.get().getId()); // Use user.get() to access the User object
    request.setUserName(user.get().getName());
    request.setEmail(user.get().getEmail());
    request.setServices(dto.getServices());
    request.setDescription(dto.getDescription());

    ServiceRequest saved = serviceRequestService.addServiceRequest(request);
    return new ResponseEntity<>(saved, HttpStatus.CREATED);
}
  
  @GetMapping("/previous")
  public ResponseEntity<List<ServiceRequest>> getPreviousRequestByEmail(@RequestParam String email) {
      List<ServiceRequest> serviceRequests = serviceRequestService.getPreviousRequestByEmail(email);

      if (serviceRequests.isEmpty()) {
          return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
      }

      return new ResponseEntity<>(serviceRequests, HttpStatus.OK);
  }
  
  @GetMapping("/all")
  public ResponseEntity<List<ServiceRequest>> getAllServiceRequests() {
	  List<ServiceRequest> serviceRequests = serviceRequestService.getAllServiceRequests();

	  if (serviceRequests.isEmpty()) {
		  return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	  }

	  return new ResponseEntity<>(serviceRequests, HttpStatus.OK);
  }
  @PutMapping("/{id}/approve")
  public ResponseEntity<ServiceRequest> approveServiceRequest(
          @PathVariable Long id,
          @RequestBody ApproveRequestDTO approveRequestDTO) {

      Optional<ServiceRequest> serviceRequest = serviceRequestService.getServiceRequestById(id);

      if (!serviceRequest.isPresent()) {
          return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
      }

      ServiceRequest updatedRequest = serviceRequestService.approveServiceRequest(
          serviceRequest.get(),
          approveRequestDTO.getWorkerId(),
          approveRequestDTO.getWorkerName()
      );
      return new ResponseEntity<>(updatedRequest, HttpStatus.OK);
  }

  @PutMapping("/{id}/reject")
  public ResponseEntity<ServiceRequest> rejectServiceRequest(@PathVariable Long id) {
	  Optional<ServiceRequest> serviceRequest = serviceRequestService.getServiceRequestById(id);

	  if (!serviceRequest.isPresent()) {
		  return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	  }

	  ServiceRequest updatedRequest = serviceRequestService.rejectServiceRequest(serviceRequest.get());
	  return new ResponseEntity<>(updatedRequest, HttpStatus.OK);
  }


} 