import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports:[FormsModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  private router = inject(Router);
  
  constructor(private http: HttpClient, private service: LoginService) {}

  onSignIn() {
    if (this.email.trim() && this.password.trim()) {
      if (this.validatePassword(this.password)) {
        this.service.login(this.email, this.password).subscribe(
          (response) => {
            console.log('Login successful:', response);

            // Check if the email is admin
            if (this.email === 'admin@gmail.com') {
              alert('Welcome Admin!');
              this.router.navigate(['/admin']); // Redirect to admin page
            } else {
              alert('Login successful!');
              this.router.navigate(['/dashboard'], { queryParams: { email: this.email } }); // Redirect to user dashboard
            }
          },
          (error) => {
            console.error('Login failed:', error);
            alert('Login failed. Please check your credentials.');
          }
        );
      } else {
        alert('Ensure the correct format of the password.');
      }
    } else {
      alert('Please fill in both fields.');
    }
  }

  onReset(): void {
    this.email = '';
    this.password = '';
  }

  onSignUp() {
    if (this.email.trim() && this.password.trim()) {
      if (this.validatePassword(this.password)) {
        this.service.signup(this.email, this.password).subscribe(
          (response) => {
            console.log('Signup successful:', response);
            alert('Signup successful!');
          },
          (error) => {
            console.error('Signup failed:', error);
            alert('Signup failed. Please check your credentials.');
          }
        );
      } else {
        alert('Ensure the correct format of the password.');
      }
    } else {
      alert('Please fill in both fields.');
    }
  }

  validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;
    return passwordRegex.test(password);
  }
}
