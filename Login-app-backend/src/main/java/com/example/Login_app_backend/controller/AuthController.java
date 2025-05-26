package com.example.Login_app_backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.Login_app_backend.model.User;
import com.example.Login_app_backend.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200") // Allow requests from Angular frontend
public class AuthController {

    @Autowired
    private AuthService authService;
    
    @GetMapping("/all")
    public ResponseEntity<?> getAll() {
    	List <User> users = authService.getAllUsers();
    	return ResponseEntity.ok(users);
    }
    @PostMapping("/add")
    public ResponseEntity<User> addUser(@RequestBody User user) {
		User savedUser = authService.addUser(user);
		return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
	}

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User loginRequest) {
        System.out.println("Login request received: " + loginRequest.getEmail() + ", " + loginRequest.getPassword());
    	boolean isAuthenticated = authService.login(loginRequest.getEmail(), loginRequest.getPassword());

        if (isAuthenticated) {
            return ResponseEntity.ok("Login Successful"); // Return HTTP 200 with success message
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Email or Password"); // Return HTTP 401 with error message
        }
    }
    
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User signupRequest) {
    	
    	boolean isSignupSuccessful = authService.signup(signupRequest.getEmail(), signupRequest.getPassword());
    	
    	 if (isSignupSuccessful) {
    	        return ResponseEntity.ok("Signup Successful"); // Return HTTP 200 with success message
    	    } else {
    	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Signup Failed: Email already exists"); // Return HTTP 400 with error message
    	    }

	}
    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, String>> Naming(@RequestParam String email) {
        String name = authService.getName(email);
        
        Map<String, String> response = new HashMap<>();
        if (name != null) {
            response.put("name", name);
            return ResponseEntity.ok(response);
        } else {
            response.put("error", "Name not found for email: " + email);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }
    
    @GetMapping("/getUserIdByEmail")
    public ResponseEntity<Long> getUserIdByEmail(@RequestParam String email) {
		Long userId = authService.getUserIdByEmail(email);
		if (userId != null) {
			return ResponseEntity.ok(userId);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}
    
    @GetMapping("/getNameByEmail")
    public ResponseEntity<Map<String, String>> getUserNameByEmail(@RequestParam String email) {
        String name = authService.getName(email);

        Map<String, String> response = new HashMap<>();
        if (name != null) {
            response.put("name", name); // Add the name to the response map
            return ResponseEntity.ok(response); // Return a JSON object
        } else {
            response.put("error", "Name not found for email: " + email); // Add an error message
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response); // Return HTTP 404 with the error
        }
    }
    
    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteUser(@RequestParam Long userId) {
		authService.deleteUser(userId);
		return ResponseEntity.noContent().build(); // Return HTTP 204 No Content
	}
    
    @PutMapping("/updateUser")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        User updatedUser = authService.updateUser(user);
        if (updatedUser != null) {
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/getUserById")
    public ResponseEntity<User> getUserById(@RequestParam Long userId) {
		User user = authService.getUserById(userId);
		if (user != null) {
			return new ResponseEntity<>(user, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}

