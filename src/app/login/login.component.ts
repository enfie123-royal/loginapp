import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private http: HttpClient) {}

  onSignIn() {
    // Call the login endpoint
    this.http.post('http://localhost:8080/api/login', {
      username: 'username',
      password: 'password'
    }).subscribe(response => {
     ('Login successful', response);
    }, error => {
      console.error('Login failed', error);
    });
  }

  onReset() {
    // Reset the form
    (document.querySelector('form') as HTMLFormElement).reset();
  }

  onSignUp() {
    // Navigate to the signup page
    this.router.navigate(['/signup']);
  }
}
