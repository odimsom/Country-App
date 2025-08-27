import type Country from '../interfaces/country.interface';
import type { CountryResponse } from '../interfaces/res-country.interfaces';

export default class CountryMapper {
  public static CountryResponseToCountry = (
    country: CountryResponse
  ): Country => {
    return {
      cca2: country.cca2,
      flag: country.flags.svg,
      flagsSvg: country.flags.png,
      name: country.name.common,
      capital: country.capital.join(','),
      population: country.population,
      region: country.region,
      subRegion: country.subregion,
    };
  };

  public static CountriesResponseToCountries = (
    countries: CountryResponse[]
  ): Country[] => {
    return countries.map(this.CountryResponseToCountry);
  };
}
