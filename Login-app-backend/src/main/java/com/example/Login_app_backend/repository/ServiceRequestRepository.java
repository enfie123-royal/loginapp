package com.example.Login_app_backend.repository; 

 

import com.example.Login_app_backend.model.ServiceRequest;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository; 

 
@Repository
public interface ServiceRequestRepository extends JpaRepository<ServiceRequest, Long> {

	Optional<ServiceRequest> findTopByEmailOrderByRequestDateDesc(String email);

    List<ServiceRequest> findAllByEmail(String email);

} 