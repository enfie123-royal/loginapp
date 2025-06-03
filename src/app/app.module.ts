import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule and ReactiveFormsModule for forms
import { provideHttpClient } from '@angular/common/http'; // Import HttpClientModule for HTTP requests
import { RouterModule } from '@angular/router'; // Import RouterModule for routing

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { routes } from './app.routes'; // Import routes array
import { CommonModule } from '@angular/common'; 

@NgModule({
  declarations: [
    SignupComponent, // Declare SignupComponent
  ],
  imports: [
    BrowserModule, // Import BrowserModule for browser support
    DashboardComponent, // Declare DashboardComponent
    AppComponent, // Declare AppComponent
    LoginComponent, // Declare LoginComponent
    FormsModule,// Add FormsModule for template-driven forms
    CommonModule, // Import CommonModule for common directives
    ReactiveFormsModule, // Add ReactiveFormsModule for reactive forms
    RouterModule.forRoot(routes), // Configure routes using RouterModule
  ],
  providers: [provideHttpClient()], // Provide HttpClient for HTTP requests
})
export class AppModule {}
