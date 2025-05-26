package com.example.Login_app_backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Login_app_backend.model.Car;
import com.example.Login_app_backend.repository.Carrepository;

@Service
public class Carservice {

    @Autowired
    private Carrepository carrepository;

    public List<Car> getCarsByUserId(Long userId) {
        return carrepository.findByUserId(userId);
    }

	public Object getAll() {
		// TODO Auto-generated method stub
		return carrepository.findAll();
	}

	public Car addCar(Car car) {
		// TODO Auto-generated method stub
		return carrepository.save(car);
	}

	public void deleteCar(Car car) {
		// TODO Auto-generated method stub
		carrepository.delete(car);
	}

	public Optional<Car> getCarById(Long carId) {
		// TODO Auto-generated method stub
		Optional<Car> car = carrepository.findById(carId);
		if (car.isPresent()) {
			return car;
		} else {
			return null; // Car not found
		}
	}
}
