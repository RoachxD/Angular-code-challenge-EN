import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { KentekenCheck } from 'rdw-kenteken-check';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class CustomValidatorsModule {
  static licensePlateValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const ktCheck = new KentekenCheck(control.value);
    if (ktCheck.valid) {
      return null;
    }

    return { pattern: true };
  }
}
