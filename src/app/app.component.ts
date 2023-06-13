import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidatorsModule } from './utils/custom-validators.module';

interface Vehicle {
  imageUrl: string;
  subTypes?: string[];
  type: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  validationErrors = {
    vehicleType: [{ type: 'required', message: 'Dit veld is verplicht.' }],
    vehicleSubType: [{ type: 'required', message: 'Dit veld is verplicht.' }],
    licensePlate: [
      { type: 'required', message: 'Dit veld is verplicht.' },
      {
        type: 'pattern',
        message:
          'Helaas is het ingevoerde kenteken niet geldig. Probeer het opnieuw.',
      },
    ],
  };

  vehicleForm = new FormGroup({
    vehicleType: new FormControl(null, [Validators.required]),
    vehicleSubType: new FormControl(null, [Validators.required]),
    licensePlate: new FormControl('', [
      Validators.required,
      CustomValidatorsModule.licensePlateValidator,
    ]),
  });

  vehicles: Vehicle[] = [
    {
      imageUrl: 'auto.jpg',
      subTypes: [
        'Hatchback',
        'Sedan',
        'Station',
        'Cabriolet',
        'Coupé',
        'Multi Purpose Vehicle (MVP)',
        'Terreinauto',
      ],
      type: 'Auto',
    },
    {
      imageUrl: 'motor.jpg',
      subTypes: [
        'All-road',
        'Naked',
        'Enduro',
        'Race',
        'Toermotor',
        'Chopper',
        'Zijspan',
      ],
      type: 'Motor',
    },
    { imageUrl: 'scooter.jpg', type: 'Scooter' },
  ];

  getVehicleImageUrl() {
    const vehicleType = this.getVehicleType();
    if (!vehicleType) {
      return null;
    }

    return this.vehicles.find((v) => v.type === vehicleType)?.imageUrl;
  }

  getVehicleSubTypes() {
    const vehicleType = this.getVehicleType();
    if (!vehicleType) {
      return null;
    }

    return this.vehicles.find((v) => v.type === vehicleType)?.subTypes;
  }

  getVehicleType() {
    return this.vehicleForm.get('vehicleType')?.value;
  }

  hasValidationError(controlName: string, validationType: string) {
    const control = this.vehicleForm.get(controlName);
    if (!control) {
      return null;
    }

    return (
      control.hasError(validationType) && (control.dirty || control.touched)
    );
  }

  onVehicleTypeChange() {
    const vehicleType = this.getVehicleType();
    if (vehicleType) {
      if (vehicleType === 'Scooter') {
        this.vehicleForm.get('vehicleSubType')?.setValidators(null);
      } else {
        this.vehicleForm
          .get('vehicleSubType')
          ?.setValidators([Validators.required]);
      }
    }

    this.vehicleForm.get('vehicleSubType')?.setValue(null);
  }

  onVehicleFormSubmit() {
    if (this.vehicleForm.invalid) {
      return;
    }

    console.log('Flawless Victory!');
    console.log(this.vehicleForm.value);
  }
}
