import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { catchError, map, Observable, throwError } from 'rxjs';

import { CountryResponse } from '../interfaces/res-country.interfaces';
import CountryMapper from '../mappers/country.mapper';
import Country from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private _http = inject(HttpClient);

  public SearchByCapital = (query: string): Observable<Country[]> => {
    const queryLowerCase = query.toLowerCase();
    return this._http
      .get<CountryResponse[]>(`${API_URL}/capital/${queryLowerCase}`)
      .pipe(
        map((countries) =>
          CountryMapper.CountriesResponseToCountries(countries)
        ),
        catchError(() => {
          return throwError(() => new Error(`${query}`));
        })
      );
  };

  public SearchByCountry = (query: string): Observable<Country[]> => {
    const queryLowerCase = query.toLowerCase();
    return this._http
      .get<CountryResponse[]>(`${API_URL}/name/${queryLowerCase}`)
      .pipe(
        map((countries) =>
          CountryMapper.CountriesResponseToCountries(countries)
        ),
        catchError(() => {
          return throwError(
            () =>
              new Error(
                `You must specify the name to search by country (Search error: ${query})`
              )
          );
        })
      );
  };
}
