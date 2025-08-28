import { Component, inject, linkedSignal, resource } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';
import CountryMapper from '../../mappers/country.mapper';
import Region from '../../types/region.type';
import HelperRegion from './helpers/to-region.helper';

@Component({
  selector: 'app-by-region',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionComponent {
  public _colors = [
    '',
    'btn-warning',
    'btn-primary',
    'btn-secondary',
    'btn-accent',
    'btn-info',
    'btn-success',
  ];
  public readonly _regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  _regionsWithColors = this._regions.map((region, i) => ({
    name: region,
    color: this._colors[i] || '',
  }));

  public _countryService: CountryService = inject(CountryService);

  public _currentRoute: ActivatedRoute = inject(ActivatedRoute);
  public _route: Router = inject(Router);
  public _queryParams = toSignal(
    this._currentRoute.params.pipe(map((params) => params['query']))
  );

  public _query = linkedSignal<Region>(() =>
    HelperRegion.ValidateQueryParams(this._queryParams())
  );

  public _countryResource = resource({
    request: () => ({
      query: this._query(),
    }),
    loader: async ({ request }) => {
      if (!request.query) return [];

      this._route.navigate([
        '/country/by-region',
        {
          query: request.query,
        },
      ]);

      return await firstValueFrom(
        this._countryService
          .Search(
            request.query,
            'region',
            'You must specify the country name in English to search (Search error:)',
            'Region'
          )
          .pipe(map(CountryMapper.CountriesResponseToCountries))
      );
    },
  });
}
