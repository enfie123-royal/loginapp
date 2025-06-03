import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private http: HttpClient) {}

  onSignUp() {
    // Call the signup endpoint
    this.http.post('http://localhost:8080/api/signup', {
      username: 'username',
      password: 'password'
    }).subscribe(response => {
      console.log('Signup successful', response);
    }, error => {
      console.error('Signup failed', error);
    });
  }
}
