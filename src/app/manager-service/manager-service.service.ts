import { Injectable } from '@angular/core'; 

import { HttpClient } from '@angular/common/http'; 

import { Observable } from 'rxjs'; 

 

@Injectable({ 

  providedIn: 'root' 

}) 

export class ManagerServiceService { 

 

  constructor(private http: HttpClient) {} 

 

  getAllRequests(): Observable<any[]> { 

    return this.http.get<any[]>('http://localhost:8080/service-requests/all'); 

  } 

 

  getAllWorkers(): Observable<any[]> { 

    return this.http.get<any[]>('http://localhost:8080/workers/all'); 

  } 

 

  approveRequest(requestId: number, workerId: String, workerName: string): Observable<any> { 

    return this.http.put( 

      `http://localhost:8080/service-requests/${requestId}/approve`, 

      { workerId, workerName } 

    ); 

  } 

 

  rejectRequest(requestId: number): Observable<any> { 

    return this.http.put(`http://localhost:8080/service-requests/${requestId}/reject`, {}); 

  } 

}