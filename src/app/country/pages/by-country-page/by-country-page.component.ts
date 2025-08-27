import { Component, inject, resource, signal } from '@angular/core';

import { firstValueFrom, map } from 'rxjs';

import { CountryService } from '../../services/country.service';
import { CountrySearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import CountryMapper from '../../mappers/country.mapper';

@Component({
  selector: 'app-by-country',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryComponent {
  public _countryService: CountryService = inject(CountryService);

  public _query = signal<string>('');

  public _countryResource = resource({
    request: () => ({
      query: this._query(),
    }),
    loader: async ({ request }) => {
      if (!request.query) return [];
      return await firstValueFrom(
        this._countryService
          .Search(
            request.query,
            'name',
            'You must specify the country name in English to search (Search error:)'
          )
          .pipe(map(CountryMapper.CountriesResponseToCountries))
      );
    },
  });
}
