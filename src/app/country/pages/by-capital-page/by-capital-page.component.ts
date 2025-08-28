import { Component, inject, linkedSignal, resource } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { firstValueFrom, map } from 'rxjs';

import { CountrySearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';
import CountryMapper from '../../mappers/country.mapper';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  //
  public _countryService: CountryService = inject(CountryService);
  public _currentRoute: ActivatedRoute = inject(ActivatedRoute);
  public _route: Router = inject(Router);
  //
  //
  public _queryParams = toSignal(
    this._currentRoute.params.pipe(map((params) => params['query']))
  );
  public _query = linkedSignal<string>(() => this._queryParams());
  //
  //
  public _countryResource = resource({
    request: () => ({
      query: this._query(),
    }),
    loader: async ({ request }) => {
      if (!request.query) return [];
      //
      this._route.navigate([
        '/country/by-capital',
        {
          query: request.query,
        },
      ]);
      //
      return await firstValueFrom(
        this._countryService
          .Search(
            request.query,
            'name',
            'You must specify the country name in English to search (Search error:)',
            'Capital'
          )
          .pipe(map(CountryMapper.CountriesResponseToCountries))
      );
    },
  });

  // public _countryResource = resource({
  //   request: () => ({
  //     query: this._query(),
  //   }),
  //   loader: async ({ request }) => {
  //     if (!request.query) return [];
  //     return await firstValueFrom(
  //       this._countryService.Search(request.query, 'capital')
  //     );
  //   },
  // });

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
