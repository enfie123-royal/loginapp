import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule and ReactiveFormsModule for forms
import { ServiceRequestComponent } from './service-request.component';


@NgModule({
  declarations: [
    // No declarations needed for standalone components
  ],
  imports: [
    CommonModule,
    FormsModule, // Import FormsModule for template-driven forms
    ReactiveFormsModule, // Import ReactiveFormsModule for reactive forms
     ServiceRequestComponent,// Import standalone ServiceRequestComponent
  ],
  exports: [
     // Export ServiceRequestComponent if needed elsewhere
  ]
})
export class ServiceRequestModule { } // Export the module
