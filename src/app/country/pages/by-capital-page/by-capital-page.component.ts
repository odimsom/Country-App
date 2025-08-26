import { Component, inject, signal } from '@angular/core';

import { CountrySearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';
import Country from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  public _countryService: CountryService = inject(CountryService);

  public IsLoading = signal<boolean>(false);
  public HasError = signal<string | null>(null);
  public Countries = signal<Country[]>([]);

  public OnSearch = (query: string): void => {
    if (this.IsLoading()) return;

    this.IsLoading.set(true);
    this.HasError.set(null);

    this._countryService.SearchByCapital(query).subscribe((countries) => {
      this.IsLoading.set(false);
      this.Countries.set(countries);
    });
  };
}
