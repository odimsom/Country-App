import { Component, inject, ResourceRef } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { map } from 'rxjs';

import { CountryService } from '../../services/country.service';
import { Search404Component } from '../../components/Errors/search-404/search-404.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { ShowInformationComponent } from './show-information/show-information.component';
import CountryMapper from '../../mappers/country.mapper';
import type { MoreInformation } from '../../interfaces/more-information-interface';

@Component({
  selector: 'app-country-page',
  imports: [Search404Component, LoadingComponent, ShowInformationComponent],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  public _iso = toSignal(
    inject(ActivatedRoute).params.pipe(map((params) => params['iso']))
  );

  public _countryService: CountryService = inject(CountryService);

  public _countryResource: ResourceRef<MoreInformation | undefined> =
    rxResource({
      request: () => ({
        code: this._iso(),
      }),
      loader: ({ request }) => {
        return this._countryService
          .Search(
            request.code,
            'alpha',
            'Not exits Country with this iso code',
            'Iso'
          )
          .pipe(
            map(CountryMapper.CountriesResponseToMoreInformation),
            map((currentCountry) => currentCountry[0])
          );
      },
    });
}
