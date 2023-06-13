import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  vehicleImage: string | null | undefined;

  setVehicleImage(imageUrl: string | null | undefined) {
    this.vehicleImage = imageUrl;
  }
}
