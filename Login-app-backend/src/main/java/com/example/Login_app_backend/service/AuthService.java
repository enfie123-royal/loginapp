package com.example.Login_app_backend.service;
import org.springframework.beans.factory.annotation.Autowired; 

import org.springframework.stereotype.Service;

import com.example.Login_app_backend.model.User;
import com.example.Login_app_backend.repository.UserRepository;

import java.util.List;
import java.util.Optional; 

 

@Service 
public class AuthService { 
	
    @Autowired 
    private UserRepository userRepository; 
    public boolean login(String email, String password) { 
System.out.println("Login attempt with email: " + email + " and password: " + password);
        Optional<User> userOpt = userRepository.findByEmail(email); 

        if (userOpt.isPresent()) { 
            User user = userOpt.get(); 
            return user.getPassword().equals(password); 
        } 
        return false; 
    }
    
	public boolean signup(String email, String password) {
		if(userRepository.findByEmail(email).isPresent()) {
			return false;
		} else {
			User newUser = new User();
			newUser.setEmail(email);
			newUser.setPassword(password);
			userRepository.save(newUser);
			return true;
		}
	}

	public String getName(String email) {
		Optional<User> userOpt = userRepository.findByEmail(email); 
		if (userOpt.isPresent()) { 
			User user = userOpt.get(); 
			return user.getName(); 
		} else {
			return null; // User not found
		}
	}

	public Long getUserIdByEmail(String email) {
		Optional<User> userOpt = userRepository.findByEmail(email); 
		if (userOpt.isPresent()) { 
			User user = userOpt.get(); 
			return user.getId(); 
		} else {
			return null;
		}
	}

	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

	public void deleteUser(Long userId) {
		Optional<User> userOpt = userRepository.findById(userId);
		if (userOpt.isPresent()) {
			userRepository.delete(userOpt.get());
		} else {
			System.out.println("User not found with ID: " + userId);
		}
	}

	public User addUser(User user) {
		
		return userRepository.save(user);
	}

	public User updateUser(User user) {
		Optional<User> existingUserOpt = userRepository.findById(user.getId());
		if (existingUserOpt.isPresent()) {
			User existingUser = existingUserOpt.get();
			existingUser.setEmail(user.getEmail());
			existingUser.setPassword(user.getPassword());
			existingUser.setName(user.getName());
			existingUser.setAddress(user.getAddress());
			existingUser.setPhone_number(user.getPhone_number());
			existingUser.setAge(user.getAge());
			existingUser.setGender(user.getGender());
			existingUser.setUsername(user.getUsername());
			
			
			
			return userRepository.save(existingUser);
		} else {
			return null; // User not found
		}
	}

	public User getUserById(Long userId) {
		Optional<User> userOpt = userRepository.findById(userId);
		if (userOpt.isPresent()) {
			return userOpt.get();
		} else {
			return null; // User not found
		}
	} 
} 