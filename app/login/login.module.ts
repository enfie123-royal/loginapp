import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
     // Declare LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Import ReactiveFormsModule for reactive forms
     // Import FormsModule for template-driven forms
  ],
  exports: [
    // Export LoginComponent if needed elsewhere
  ],
})
export class LoginModule {}
