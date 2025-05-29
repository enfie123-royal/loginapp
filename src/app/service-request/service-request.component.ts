import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../dashboard/dashboard.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-service-request',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './service-request.component.html',
  styleUrls: ['./service-request.component.css']
})
export class ServiceRequestComponent implements OnInit {
  serviceForm!: FormGroup;
  services: string[] = [
    'Carwash - Basic (₹300)',
    'Carwash - Premium (₹600)',
    'Oil Change',
    'Tire Replacement',
    'Battery Check',
    'General Service',
    'Pickup and Drop',
    'AC Repair',
    'Engine Diagnostics',
    'Insurance Renewal'
  ];

  constructor(
    private dashboardService: DashboardService,
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
    // Initialize the form immediately to avoid undefined errors in the template
    this.serviceForm = this.fb.group({
      carwashType: [''],
      oilChange: [false],
      tireReplacementType: [''],
      batteryCheckType: [''],
      acRepairType: [''],
      engineDiagnostics: [false],
      generalService: [false],      // <-- Add this
      pickupDrop: [false],          // <-- And this
      insuranceRenewal: [false],    // If you use it in the template
      description: ['']
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const email = params['email'];
      // Use the email to fetch user info if needed
    });
  }

  submitRequest(): void {
    if (this.serviceForm.valid) {
      const data = {
        ...this.serviceForm.value,
        date: new Date()
      };

      this.http.post('http://localhost:8080/api/service-request', data).subscribe(
        () => {
          alert('Service request submitted successfully!');
          this.serviceForm.reset();
        },
        () => {
          alert('Something went wrong while submitting the request.');
        }
      );
    }
  }
}