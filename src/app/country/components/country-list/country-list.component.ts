import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import type Country from '../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';
import { LoadingComponent } from '../loading/loading.component';
import { Search404Component } from '../Errors/search-404/search-404.component';

@Component({
  selector: 'country-list',
  imports: [DecimalPipe, RouterLink, LoadingComponent, Search404Component],
  templateUrl: './country-list.component.html',
})
export class CountryListComponent {
  public _countries = input.required<Country[]>();

  public IsError = input<string | unknown | null>();
  public IsLoading = input<boolean>(false);
  public IsEmpty = input<boolean>(false);
}
