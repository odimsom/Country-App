import { Component, effect, inject, resource, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { firstValueFrom, map } from 'rxjs';

import { CountryService } from '../../services/country.service';
import Region from '../../types/region.type';
import CountryMapper from '../../mappers/country.mapper';

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
            'region',
            'You must specify the country name in English to search (Search error:)',
            'Region'
          )
          .pipe(map(CountryMapper.CountriesResponseToCountries))
      );
    },
  });
}
