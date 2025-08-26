import { Component, input } from '@angular/core';
import { CountryResponse } from '../../interfaces/res-country.interfaces';
import Country from '../../interfaces/country.interface';

@Component({
  selector: 'country-list',
  imports: [],
  templateUrl: './country-list.component.html',
})
export class CountryListComponent {
  public _countries = input.required<Country[]>();
}
