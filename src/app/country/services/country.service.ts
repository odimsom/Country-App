import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { catchError, delay, map, Observable, throwError } from 'rxjs';

import { CountryResponse } from '../interfaces/res-country.interfaces';
import CountryMapper from '../mappers/country.mapper';
import Country from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private _http = inject(HttpClient);

  public Search = (
    query: string,
    by: string,
    errorMessage: string = 'Search error:'
  ): Observable<Country[]> => {
    const queryLowerCase = query.toLowerCase();
    return this._http
      .get<CountryResponse[]>(`${API_URL}/${by}/${queryLowerCase}`)
      .pipe(
        map((countries) =>
          CountryMapper.CountriesResponseToCountries(countries)
        ),
        catchError(() => {
          return throwError(() => new Error(`(${errorMessage} ${query})`));
        })
      );
  };
}
