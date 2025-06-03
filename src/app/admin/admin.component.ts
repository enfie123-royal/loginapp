import { Component, OnInit } from '@angular/core';
import { AdminService } from './admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare var bootstrap: any; // Declare Bootstrap for modal functionality

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [CommonModule, FormsModule], // Import CommonModule for ngIf and ngFor directives
})
export class AdminComponent implements OnInit {
  cars: any[] = []; // Array to store car details
  filteredCars: any[] = []; // Array to store filtered car details
  searchCarId: number | null = null; // Variable to store the entered car ID for filtering
  users: any[] = []; // Array to store user details
  filteredUsers: any[] = []; // Array to store filtered user details
  searchUserId: number | null = null; // Variable to store the entered user ID for filtering
  showCarTable: boolean = false; // Flag to show car table
  showUserTable: boolean = false; // Flag to show user table
  newCar: any = { id: null, model: '', year: null, licensePlate: '', userId: null }; // Object to store new car details
  selectedCar: any = { id: null, model: '', year: null, licensePlate: '', userId: null }; // Object to store selected car for editing
  newUser: any = { name: '', email: '', password: '' }; // Object to store new user details
  selectedUser: any = { id: null, name: '', email: '', password: '' }; // Object to store selected user for editing

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getAllCars();
    this.getAllUsers();
  }

  // Fetch all cars
  getAllCars(): void {
    this.adminService.getAllCars().subscribe(
      (response: any[]) => {
        this.cars = response;
        this.filteredCars = response; // Initialize filteredCars with all cars
      },
      (error: any) => {
        console.error('Error fetching cars:', error);
      }
    );
  }

  // Filter cars based on the entered ID
  filterCars(): void {
    if (this.searchCarId) {
      this.filteredCars = this.cars.filter((car) => car.id === this.searchCarId);
    } else {
      this.filteredCars = [...this.cars]; // Reset to all cars if no ID is entered
    }
  }

  // Fetch all users
  getAllUsers(): void {
    this.adminService.getAllUsers().subscribe(
      (response: any[]) => {
        this.users = response;
        this.filteredUsers = response; // Initialize filteredUsers with all users
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  // Filter users based on the entered ID
  filterUsers(): void {
    if (this.searchUserId) {
      this.filteredUsers = this.users.filter((user) => user.id === this.searchUserId);
    } else {
      this.filteredUsers = [...this.users]; // Reset to all users if no ID is entered
    }
  }

  // Show car details
  showCars(): void {
    this.showCarTable = true;
    this.showUserTable = false;
  }

  // Show user details
  showUsers(): void {
    this.showCarTable = false;
    this.showUserTable = true;
  }

  // Open Add Car Modal
  openAddCarModal(): void {
    const modalElement = document.getElementById('addCarModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  

  // Submit new car
  submitCar(): void {
    const payload = {
      id: this.newCar.id, // Ensure the car ID is null for new cars
      model: this.newCar.model,
      year: this.newCar.year,
      licensePlate: this.newCar.licensePlate,
      user: {
        id: this.newCar.userId // Ensure the user ID is correctly set
      }
    };

    console.log('Payload being sent to backend:', payload); // Debugging log

    this.adminService.saveCar(payload).subscribe(
      (response: any) => {
        console.log('Car added successfully:', response);
        this.getAllCars(); // Refresh the car list
        this.newCar = { id: null, model: '', year: null, licensePlate: '', userId: null }; // Reset the form
        const modalElement = document.getElementById('addCarModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide(); // Close the modal
      },
      (error: any) => {
        console.error('Error adding car:', error);
      }
    );
  }

  // Open Edit Car Modal
  openEditCarModal(car: any): void {
    this.selectedCar = { ...car }; // Clone the car object to avoid direct mutation
    const modalElement = document.getElementById('editCarModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  // Update car
  updateCar(): void {
    const payload = {
      id: this.selectedCar.id,
      model: this.selectedCar.model,
      year: this.selectedCar.year,
      licensePlate: this.selectedCar.licensePlate,
      user: this.selectedCar.userId ? { id: this.selectedCar.userId } : null // Handle null userId
    };

    console.log('Payload being sent to backend for car update:', payload); // Debugging log

    this.adminService.saveCar(payload).subscribe(
      (response: any) => {
        console.log('Car updated successfully:', response);
        this.getAllCars(); // Refresh the car list
        const modalElement = document.getElementById('editCarModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide(); // Close the modal
      },
      (error: any) => {
        console.error('Error updating car:', error);
      }
    );
  }

  // Add a new car
  addCar(): void {
    this.newCar = { id: null, model: '', year: null, licensePlate: '', userId: null }; // Reset the form
    const modalElement = document.getElementById('addCarModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  // Edit a car
  editCar(car: any): void {
    this.selectedCar = { ...car }; // Clone the car object to avoid direct mutation
    const modalElement = document.getElementById('editCarModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  // Delete a car
  deleteCar(carId: number): void {
    if (confirm('Are you sure you want to delete this car?')) {
      this.adminService.deleteCar(carId).subscribe(
        () => {
          console.log(`Car with ID ${carId} deleted successfully.`);
          this.getAllCars(); // Refresh the car list
        },
        (error: any) => {
          console.error('Error deleting car:', error);
        }
      );
    }
  }

  // Add a new user
  addUser(): void { 

    this.newUser = { name: '', email: '', password: '' }; 
  
    const modalElement = document.getElementById('addUserModal'); 
  
    if (modalElement) { 
  
      const modal = new bootstrap.Modal(modalElement); 
  
      modal.show(); 
  
    } 
  
  } 
  
   
  
  editUser(user: any): void { 
  
    this.selectedUser = { ...user }; 
  
    const modalElement = document.getElementById('editUserModal'); 
  
    if (modalElement) { 
  
      const modal = new bootstrap.Modal(modalElement); 
  
      modal.show(); 
  
    } 
  
  } 
  
   
  // Delete a user
  deleteUser(userId: number): void {
    this.adminService.deleteUser(userId).subscribe(
      () => {
        console.log('User deleted successfully');
        this.getAllUsers(); // Refresh the user list
      },
      (error: any) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  // Submit new user
  submitUser(): void {
    const payload = {
      name: this.newUser.name,
      email: this.newUser.email,
      password: this.newUser.password
    };

    console.log('Payload being sent to backend for adding user:', payload); // Debugging log

    this.adminService.saveUser(payload).subscribe(
      (response: any) => {
        console.log('User added successfully:', response);
        this.getAllUsers(); // Refresh the user list
        const modalElement = document.getElementById('addUserModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide(); // Close the modal
      },
      (error: any) => {
        console.error('Error adding user:', error);
      }
    );
  }

  // Update user
  updateUser(): void {
    const payload = {
      id: this.selectedUser.id, // Ensure the user ID is included but not editable
      name: this.selectedUser.name,
      email: this.selectedUser.email,
      password: this.selectedUser.password
    };

    console.log('Payload being sent to backend for user update:', payload); // Debugging log

    this.adminService.updateUser(payload).subscribe(
      (response: any) => {
        console.log('User updated successfully:', response);
        this.getAllUsers(); // Refresh the user list
        const modalElement = document.getElementById('editUserModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide(); // Close the modal
      },
      (error: any) => {
        console.error('Error updating user:', error);
      }
    );
  }

  // View user profile
  viewUserProfile(user: any): void {
    this.adminService.getUserProfile(user.id).subscribe(
      (profile: any) => {
        // You can display the profile data in a modal or console for now
        console.log('User profile:', profile);
        alert(`User Profile:\nName: ${profile.name}\nEmail: ${profile.email}\nID: ${profile.id}\nphone_number: ${profile.phone_number}\naddress: ${profile.address}\ngender: ${profile.gender}\nusername: ${profile.username}\nage:${profile.age}`);

      },
      (error: any) => {
        console.error('Error fetching user profile:', error);
        alert('Failed to fetch user profile.');
      }
    );
  }
}
