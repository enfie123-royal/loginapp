import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from './dashboard.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

declare var bootstrap: any; // Declare Bootstrap for modal functionality

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule,FormsModule], // Import CommonModule for ngIf and ngFor directives
})
export class DashboardComponent implements OnInit {
  email: string = '';
  name: string = '';
  carDetails: any[] = []; // Array to store car details
  rawResponse: any = null; // Variable to store raw backend response
  showTable: boolean = false; // Flag to control table visibility
  newCar: any = { id: null, model: '', year: null, licensePlate: '' }; // Object to store new car details
  userProfile: any = null;
  editingProfile = false;

  constructor(private route: ActivatedRoute, private dashboardService: DashboardService, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'];
      if (this.email) {
        // Fetch the name using the email
        this.dashboardService.getNameByEmail(this.email).subscribe(
          (response: any) => {
            this.name = response.name || response; // Handle both JSON and plain string responses
          },
          (error: any) => {
            console.error('Error retrieving name:', error);
            this.name = 'Guest';
          }
        );
      } else {
        this.name = 'Guest';
      }
    });
  }

  showCarDetails(): void {
    if (!this.email) {
      console.error('Email is undefined. Cannot fetch userId.');
      return;
    }

    console.log('Fetching userId for email:', this.email); // Debugging log

    // Fetch the userId using the email
    this.dashboardService.getUserIdByEmail(this.email).subscribe(
      (userId: number) => {
        console.log('Retrieved userId:', userId); // Debugging log

        if (!userId) {
          console.error('User ID is undefined. Cannot fetch car details.');
          return;
        }

        // Fetch car details using the userId
        this.dashboardService.getCarDetails(userId).subscribe(
          (carDetails: any[]) => {
            this.carDetails = carDetails; // Directly assign the response to carDetails
            this.rawResponse = carDetails; // Store the raw response
            this.showTable = true; // Show the table
            console.log('Car details:', this.carDetails); // Log the car details
          },
          (error: any) => {
            console.error('Error retrieving car details:', error);
            this.rawResponse = error; // Store the error response
          }
        );
      },
      (error: any) => {
        console.error('Error retrieving user ID:', error);
        this.rawResponse = error; // Store the error response
      }
    );
  }

  // Open Add Car Modal
  openAddCarModal(): void {
    this.newCar = { id: null, model: '', year: null, licensePlate: '' }; // Reset the form
    const modalElement = document.getElementById('addCarModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  // Submit new car
  submitCar(): void {
    if (!this.email) {
      console.error('Email is undefined. Cannot fetch userId.');
      return;
    }

    console.log('Fetching userId for email:', this.email); // Debugging log

    // Fetch the userId using the email
    this.dashboardService.getUserIdByEmail(this.email).subscribe(
      (userId: number) => {
        console.log('Retrieved userId:', userId); // Debugging log

        if (!userId) {
          console.error('User ID is undefined. Cannot add car.');
          return;
        }

        const payload = {
          id: this.newCar.id,
          model: this.newCar.model,
          year: this.newCar.year,
          licensePlate: this.newCar.licensePlate,
          user: { id: userId } // Include the userId in the payload
        };

        console.log('Payload being sent to backend for adding car:', payload); // Debugging log

        this.dashboardService.addCar(payload).subscribe(
          (response: any) => {
            console.log('Car added successfully:', response);
            this.showCarDetails(); // Refresh the car list
            const modalElement = document.getElementById('addCarModal');
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal.hide(); // Close the modal
          },
          (error: any) => {
            console.error('Error adding car:', error);
          }
        );
      },
      (error: any) => {
        console.error('Error retrieving user ID:', error);
      }
    );
  }

  viewProfile(): void {
    if (!this.email) {
      console.error('Email is undefined. Cannot fetch userId.');
      return;
    }
    this.dashboardService.getUserIdByEmail(this.email).subscribe(
      (userId: number) => {
        this.dashboardService.getUserProfile(userId).subscribe(
          (profile) => {
            this.userProfile = profile;
          },
          (error) => {
            console.error('Error fetching user profile:', error);
          }
        );
      },
      (error) => {
        console.error('Error retrieving user ID:', error);
      }
    );
  }

  saveProfile() {
    this.dashboardService.updateUserProfile(this.userProfile).subscribe(
      (updatedProfile) => {
        this.userProfile = updatedProfile; // Update the local profile with the response
        this.editingProfile = false;
      },
      (error) => {
        console.error('Error updating profile:', error);
      }
    );
  }

  goToServiceRequest() {
    this.router.navigate(['/request-service'], { queryParams: { email: this.email } });
  }
}