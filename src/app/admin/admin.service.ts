import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:8080/api/auth';
  private baseUrl1 = 'http://localhost:8080/api/car';
  constructor(private http: HttpClient) {}

  // Fetch all cars
  getAllCars(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl1}/getall`);
  }

  // Fetch all users
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }

 
  // Delete a car by userId
  deleteCar(carId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl1}/delete?carId=${carId}`);
  }

  // Delete a user
  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete?userId=${userId}`);
  }

  // Add or update a car
  saveCar(car: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl1}/add`, car);
  }

  // Add or update a user
  saveUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/add`, user);
  }

  // Update a user
  updateUser(user: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/updateUser`, user);
  }
  
 getUserProfile(userId: number) {
    return this.http.get<any>(`${this.baseUrl}/getUserById?userId=${userId}`);
  }
}