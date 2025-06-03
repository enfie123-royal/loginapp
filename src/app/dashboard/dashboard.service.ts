import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private getUserIdApiUrl = 'http://localhost:8080/api/auth/getUserIdByEmail';
  private getCarDetailsApiUrl = 'http://localhost:8080/api/car/getCar';
  private getNameApiUrl = 'http://localhost:8080/api/auth/getNameByEmail';
    private baseUrl = 'http://localhost:8080/api/car';
    private baseurl2="http://localhost:8080/service-requests/previous"; // Base URL for user-related API
    private baseUrl1= 'http://localhost:8080/api/auth' // Base URL for car-related API
  constructor(private http: HttpClient) {}

  // Fetch userId directly as a number
  getUserIdByEmail(email: string): Observable<number> {
    return this.http.get<number>(`${this.getUserIdApiUrl}?email=${email}`);
  }

  addCar(car: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/add`, car);
  }

  // Fetch car details using userId
  getCarDetails(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.getCarDetailsApiUrl}?userId=${userId}`);
  }

  // Fetch name by email
  getNameByEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.getNameApiUrl}?email=${email}`);
  }

  getUserProfile(userId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl1}/getUserById?userId=${userId}`);
  }

  updateUserProfile(profile: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl1}/updateUser`, profile);
  }

  getPreviousRequests(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseurl2}?email=${email}`);
  }

  openAddCarModal(): void {
    const modalElement = document.getElementById('addCarModal');
    if (modalElement) {
      // Ensure Bootstrap is globally available
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    } else {
      console.error('Add Car Modal element not found in the DOM.');
    }
  }
}
