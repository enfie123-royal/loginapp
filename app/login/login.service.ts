import { Injectable } from "@angular/core"; 
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, tap } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class LoginService {
    private apiUrl = "http://localhost:8080/api/auth/login";
    private apiUrl1 = "http://localhost:8080/api/auth/signup";

    constructor(private http: HttpClient) {}

    login(email: string, password: string): Observable<any> {
        const body = { email, password };
        return this.http.post<string>(this.apiUrl, body, { responseType: "text" as "json" }).pipe(
            catchError((error) => {
                console.error("Error:", error); // Log the error
                throw error; // Rethrow the error for further handling if needed
            })
        );
    }

    signup(email: string, password: string): Observable<any> {
        const body = { email, password };
        return this.http.post<string>(this.apiUrl1, body,{ responseType: "text" as "json" }).pipe(
            tap((response) => {
                console.log("Signup successful:", response); // Log success response
            }),
            catchError((error) => {
                console.error("Signup error:", error); // Log the error
                throw error; // Rethrow the error for further handling if needed
            })
        );
    }
}
