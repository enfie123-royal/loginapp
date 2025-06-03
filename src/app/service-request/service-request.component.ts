import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../dashboard/dashboard.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

declare var Razorpay: any; // Add this at the top

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
  emailFromUrl: string = '';
  previousRequests: any[] = [];
  showRequests = false;
  showBill: boolean = false;
  detailedBill: { name: string, cost: number }[] = [];

  serviceCosts = {
    carwashType: { Basic: 300, Premium: 600 },
    oilChange: 200,
    tireReplacementType: { Simple: 500, Moderate: 800, Advanced: 1200 },
    batteryCheckType: { Diagnosis: 150, Replace: 1000 },
    generalService: 400,
    pickupDrop: 100,
    acRepairType: { 'Cooling Issues': 700, 'Gas Filling': 1200 },
    engineDiagnostics: 350,
    insuranceRenewal: 2000
  };

  totalCost: number = 0;
  paymentStatus: 'pending' | 'success' | 'failed' = 'pending';
  paymentError: string = '';

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
      description: [''],
      paymentMethod: ['credit', Validators.required],
      cardNumber: [''],
      cardExpiry: [''],
      cardCvv: [''],
      upiId: ['']
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.emailFromUrl = params['email'] || '';
      if (params['showRequests']) {
        this.showPreviousRequests();
      }
    });
    this.serviceForm.valueChanges.subscribe(() => {
      this.calculateTotalCost();
    });
    this.calculateTotalCost(); // Initial calculation
  }

  submitRequest(): void {
    if (this.serviceForm.valid) {
      // Collect selected services
      const services: string[] = [];

      if (this.serviceForm.value.carwashType) {
        services.push(`car wash - ${this.serviceForm.value.carwashType.toLowerCase()}`);
      }
      if (this.serviceForm.value.oilChange) {
        services.push('oil change');
      }
      if (this.serviceForm.value.tireReplacementType) {
        services.push(`tire replacement - ${this.serviceForm.value.tireReplacementType.toLowerCase()}`);
      }
      if (this.serviceForm.value.batteryCheckType) {
        services.push(`battery check - ${this.serviceForm.value.batteryCheckType.toLowerCase()}`);
      }
      if (this.serviceForm.value.acRepairType) {
        services.push(`ac repair - ${this.serviceForm.value.acRepairType.toLowerCase()}`);
      }
      if (this.serviceForm.value.engineDiagnostics) {
        services.push('engine diagnostics');
      }
      if (this.serviceForm.value.generalService) {
        services.push('general service');
      }
      if (this.serviceForm.value.pickupDrop) {
        services.push('pickup and drop');
      }
      if (this.serviceForm.value.insuranceRenewal) {
        services.push('insurance renewal');
      }

      const data = {
        email: this.emailFromUrl,
        services,
        description: this.serviceForm.value.description,
        status: 'submitted' // <-- Add this line
      };

      this.http.post('http://localhost:8080/service-requests/add', data).subscribe(
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

  showPreviousRequests() {
    if (!this.emailFromUrl) return;
    this.getPreviousRequests(this.emailFromUrl).subscribe(requests => {
      this.previousRequests = requests;
      this.showRequests = true;
    });
  }

  getPreviousRequests(email: string) {
    return this.http.get<any[]>(`http://localhost:8080/service-requests/previous?email=${encodeURIComponent(email)}`);
  }

  calculateTotalCost() {
    const form = this.serviceForm.value;
    let total = 0;

    // Car Wash
    if (form.carwashType && this.serviceCosts.carwashType[form.carwashType as keyof typeof this.serviceCosts.carwashType]) {
      total += this.serviceCosts.carwashType[form.carwashType as keyof typeof this.serviceCosts.carwashType];
    }
    // Oil Change
    if (form.oilChange) total += this.serviceCosts.oilChange;
    // Tire Replacement
    if (form.tireReplacementType && this.serviceCosts.tireReplacementType[form.tireReplacementType as keyof typeof this.serviceCosts.tireReplacementType]) {
      total += this.serviceCosts.tireReplacementType[form.tireReplacementType as keyof typeof this.serviceCosts.tireReplacementType];
    }
    // Battery Check
    if (form.batteryCheckType && this.serviceCosts.batteryCheckType[form.batteryCheckType as keyof typeof this.serviceCosts.batteryCheckType]) {
      total += this.serviceCosts.batteryCheckType[form.batteryCheckType as keyof typeof this.serviceCosts.batteryCheckType];
    }
    // General Service
    if (form.generalService) total += this.serviceCosts.generalService;
    // Pickup and Drop
    if (form.pickupDrop) total += this.serviceCosts.pickupDrop;
    // AC Repair
    if (form.acRepairType && this.serviceCosts.acRepairType[form.acRepairType as keyof typeof this.serviceCosts.acRepairType]) {
      total += this.serviceCosts.acRepairType[form.acRepairType as keyof typeof this.serviceCosts.acRepairType];
    }
    // Engine Diagnostics
    if (form.engineDiagnostics) total += this.serviceCosts.engineDiagnostics;
    // Insurance Renewal
    if (form.insuranceRenewal) total += this.serviceCosts.insuranceRenewal;

    this.totalCost = total;
  }

  getDetailedBill() {
    const form = this.serviceForm.value;
    const bill: { name: string, cost: number }[] = [];

    if (form.carwashType && this.serviceCosts.carwashType[form.carwashType as keyof typeof this.serviceCosts.carwashType]) {
      bill.push({ name: `Car Wash (${form.carwashType})`, cost: this.serviceCosts.carwashType[form.carwashType as keyof typeof this.serviceCosts.carwashType] });
    }
    if (form.oilChange) bill.push({ name: 'Oil Change', cost: this.serviceCosts.oilChange });
    if (form.tireReplacementType && this.serviceCosts.tireReplacementType[form.tireReplacementType as keyof typeof this.serviceCosts.tireReplacementType]) {
      bill.push({ name: `Tire Replacement (${form.tireReplacementType})`, cost: this.serviceCosts.tireReplacementType[form.tireReplacementType as keyof typeof this.serviceCosts.tireReplacementType] });
    }
    if (form.batteryCheckType && this.serviceCosts.batteryCheckType[form.batteryCheckType as keyof typeof this.serviceCosts.batteryCheckType]) {
      bill.push({ name: `Battery Check (${form.batteryCheckType})`, cost: this.serviceCosts.batteryCheckType[form.batteryCheckType as keyof typeof this.serviceCosts.batteryCheckType] });
    }
    if (form.generalService) bill.push({ name: 'General Service', cost: this.serviceCosts.generalService });
    if (form.pickupDrop) bill.push({ name: 'Pickup and Drop', cost: this.serviceCosts.pickupDrop });
    if (form.acRepairType && this.serviceCosts.acRepairType[form.acRepairType as keyof typeof this.serviceCosts.acRepairType]) {
      bill.push({ name: `AC Repair (${form.acRepairType})`, cost: this.serviceCosts.acRepairType[form.acRepairType as keyof typeof this.serviceCosts.acRepairType] });
    }
    if (form.engineDiagnostics) bill.push({ name: 'Engine Diagnostics', cost: this.serviceCosts.engineDiagnostics });
    if (form.insuranceRenewal) bill.push({ name: 'Insurance Renewal', cost: this.serviceCosts.insuranceRenewal });

    this.detailedBill = bill;
    this.showBill = true;
  }

  closeBill() {
    this.showBill = false;
  }

  /***************************************
   * Razorpay Payment Integration Example *
   ***************************************/

  /* payWithRazorpay() {
    this.paymentError = '';
    const amount = this.totalCost * 100; // Razorpay expects amount in paise
    const options = {
      key: 'rzp_test_Sf0EwnwczhEaH', // Replace with your Razorpay key
      amount: amount,
      currency: 'INR',
      name: 'Car Service',
      description: 'Service Payment',
      handler: (response: any) => {
        // Payment successful
        this.paymentStatus = 'success';
        // Optionally, verify payment on your backend here
      },
      modal: {
        ondismiss: () => {
          this.paymentStatus = 'failed';
          this.paymentError = 'Payment was cancelled.';
        }
      },
      prefill: {
        email: this.emailFromUrl || '', // Optional
      },
      theme: {
        color: '#1976d2'
      }
    };
    const rzp = new Razorpay(options);
    rzp.open();
  }


  payNow() {
    this.paymentError = '';
    const method = this.serviceForm.get('paymentMethod')?.value;

    if (method === 'credit') {
      const cardNumber = this.serviceForm.get('cardNumber')?.value;
      const cardExpiry = this.serviceForm.get('cardExpiry')?.value;
      const cardCvv = this.serviceForm.get('cardCvv')?.value;
      // Simulate payment gateway validation
      if (cardNumber?.length === 16 && cardExpiry && cardCvv?.length === 3) {
        this.paymentStatus = 'success';
      } else {
        this.paymentStatus = 'failed';
        this.paymentError = 'Invalid credit card details. Please check and try again.';
      }
    } else if (method === 'upi') {
      const upiId = this.serviceForm.get('upiId')?.value;
      // Simulate UPI validation
      if (upiId && upiId.includes('@')) {
        this.paymentStatus = 'success';
      } else {
        this.paymentStatus = 'failed';
        this.paymentError = 'Invalid UPI ID. Please enter a valid UPI ID.';
      }
    }
  }

  onPaymentMethodChange() {
    this.paymentStatus = 'pending';
    this.paymentError = '';
  }*/
}