import Country from '../interfaces/country.interface';
import { CountryResponse } from '../interfaces/res-country.interfaces';

export default class CountryMapper {
  public static CountryResponseToCountry = (
    country: CountryResponse
  ): Country => {
    return {
      cca2: country.cca2,
      flag: country.flags.svg,
      flagsSvg: country.flags.png,
      name: country.name.common,
      capital: country.capital,
      population: country.population,
    };
  };

  public static CountriesResponseToCountries = (
    countries: CountryResponse[]
  ): Country[] => {
    return countries.map(this.CountryResponseToCountry);
  };
}
