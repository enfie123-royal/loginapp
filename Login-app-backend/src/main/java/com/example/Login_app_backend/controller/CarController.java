package com.example.Login_app_backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.Login_app_backend.model.Car;
import com.example.Login_app_backend.service.Carservice;


@RestController
@RequestMapping("/api/car")
@CrossOrigin(origins = "http://localhost:4200")
public class CarController {

    @Autowired
    private Carservice carService;

    @GetMapping("/getCar")
    public ResponseEntity<List<Car>> getCars(@RequestParam Long userId) {
        List<Car> cars = carService.getCarsByUserId(userId); // Assuming this method returns a list of cars
        if (!cars.isEmpty()) {
            return new ResponseEntity<>(cars, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    
    @GetMapping("/getall")
    public ResponseEntity<?> getAll() {
		return ResponseEntity.ok(carService.getAll());
	}
    
    @PostMapping("/add")
    public ResponseEntity<Car> addCar(@RequestBody Car car) {
		Car savedCar = carService.addCar(car);
		return new ResponseEntity<>(savedCar, HttpStatus.CREATED);
	}
    
    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteCar(@RequestParam Long carId) {
        Optional<Car> car = carService.getCarById(carId); // Corrected method name
        if (car.isPresent()) {
            carService.deleteCar(car.get());
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    

}
