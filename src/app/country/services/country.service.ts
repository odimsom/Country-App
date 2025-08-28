import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { catchError, delay, Observable, of, tap, throwError } from 'rxjs';

import { CountryResponse } from '../interfaces/res-country.interfaces';
import Region from '../types/region.type';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private _http = inject(HttpClient);

  private _countryInMemoryCapital = new Map<string, CountryResponse[]>();
  private _countryInMemoryCountry = new Map<string, CountryResponse[]>();
  private _countryInMemoryByIsoCode = new Map<string, CountryResponse[]>();
  private _countryInMemoryRegion = new Map<string, CountryResponse[]>();

  public Search = (
    query: string,
    by: string,
    errorMessage: string = 'Search error:',
    opt: string | Region = 'capital'
  ): Observable<CountryResponse[]> => {
    if (this._countryInMemoryCapital.has(query) && opt === 'Capital') {
      return of(this._countryInMemoryCapital.get(query) ?? []);
    } else if (this._countryInMemoryCountry.has(query) && opt === 'Country') {
      return of(this._countryInMemoryCountry.get(query) ?? []);
    } else if (this._countryInMemoryByIsoCode.has(query) && opt === 'Iso') {
      return of(this._countryInMemoryByIsoCode.get(query) ?? []);
    } else if (this._countryInMemoryRegion.has(query) && opt === 'Region') {
      return of(this._countryInMemoryRegion.get(query) ?? []);
    }

    return this._http.get<CountryResponse[]>(`${API_URL}/${by}/${query}`).pipe(
      catchError((err) => {
        return throwError(
          () => new Error(`(${errorMessage} ${err.message} ${query})`)
        );
      }),
      tap((countriesResponse) => {
        switch (opt) {
          case 'Capital':
            this._countryInMemoryCapital.set(query, countriesResponse);
            break;
          case 'Country':
            this._countryInMemoryCountry.set(query, countriesResponse);
            break;
          case 'Iso':
            this._countryInMemoryByIsoCode.set(query, countriesResponse);
            break;
          case 'Region':
            this._countryInMemoryRegion.set(query, countriesResponse);
            break;
        }
      })
    );
  };
}
