import { Component, input } from '@angular/core';
import type Country from '../../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'show-information',
  imports: [DecimalPipe],
  templateUrl: './show-information.component.html',
})
export class ShowInformationComponent {
  public _information = input.required<Country>();
}
