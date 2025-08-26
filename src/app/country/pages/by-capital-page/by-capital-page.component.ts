import { Component, inject, resource, signal } from '@angular/core';

import { CountrySearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';
import { Search404Component } from '../../components/Errors/search-404/search-404.component';
import { firstValueFrom, single } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  imports: [
    CountrySearchInputComponent,
    CountryListComponent,
    Search404Component,
  ],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  public _countryService: CountryService = inject(CountryService);

  public _query = signal<string>('');

  public _countryResource = resource({
    request: () => ({
      query: this._query(),
    }),
    loader: async ({ request }) => {
      if (!request.query) return [];
      return await firstValueFrom(
        this._countryService.SearchByCapital(request.query)
      );
    },
  });

  // public IsLoading = signal<boolean>(false);
  // public HasError = signal<string | null>(null);
  // public Countries = signal<Country[]>([]);

  // public OnSearch = (query: string): void => {
  //   if (this.IsLoading()) return;

  //   this.IsLoading.set(true);
  //   this.HasError.set(null);

  //   this._countryService.SearchByCapital(query).subscribe({
  //     next: (countries) => {
  //       this.IsLoading.set(false);
  //       this.Countries.set(countries);
  //     },
  //     error: (err) => {
  //       this.IsLoading.set(false);
  //       this.Countries.set([]);
  //       this.HasError.set(err.message);
  //     },
  //   });
  // };
}
