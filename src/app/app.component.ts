import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', // Link to the HTML template
  styleUrls: ['./app.component.css'],
  imports: [RouterModule], // Import RouterModule for routing
})
export class AppComponent {
  title = 'login-app'; // Set a title for the app
}
