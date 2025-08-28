import { Component, inject, resource, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

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

  public _currentRoute: ActivatedRoute = inject(ActivatedRoute);
  public _route: Router = inject(Router);

  public _queryParams = toSignal(
    this._currentRoute.params.pipe(map((params) => params['query']))
  );
  public _query = signal<string>(this._queryParams());

  public _countryResource = resource({
    request: () => ({
      query: this._query(),
    }),
    loader: async ({ request }) => {
      if (!request.query) return [];

      this._route.navigate([
        '/country/by-country',
        {
          query: request.query,
        },
      ]);

      return await firstValueFrom(
        this._countryService
          .Search(
            request.query,
            'name',
            'You must specify the country name in English to search (Search error:)',
            'Country'
          )
          .pipe(map(CountryMapper.CountriesResponseToCountries))
      );
    },
  });
}
