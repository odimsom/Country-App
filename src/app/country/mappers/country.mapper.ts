import type Country from '../interfaces/country.interface';
import { MoreInformation } from '../interfaces/more-information-interface';
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
      capital: country.capital ? country.capital.join(',') : 'Do not have',
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

  public static CountryResponseToMoreInformation = (
    country: CountryResponse
  ): MoreInformation => {
    const worldPopulation = 8100000000;
    const density = country.population / country.area;

    return {
      ...this.CountryResponseToCountry(country),
      officialName: country.name.official,
      worldPopulationPct: (
        (country.population / worldPopulation) *
        100
      ).toFixed(2),
      area: country.area,
      density: density.toFixed(2),
      languages: Object.values(country.languages || {}),
      currency: Object.values(country.currencies || {}).map(
        (c: any) => `${c.name} (${c.symbol})`
      ),
      gini: country.gini
        ? Object.entries(country.gini).map(([year, val]) => ({
            year,
            val,
          }))
        : [],
      borders: country.borders || [],
      demonyms: country.demonyms?.eng || {},
      timezones: country.timezones,
      maps: country.maps,
      flagAlt: country.flags.alt,
      coatOfArms: country.coatOfArms?.svg,
      fifa: country.fifa,
      tld: country.tld,
      carSide: country.car.side,
    };
  };
  public static CountriesResponseToMoreInformation = (
    countries: CountryResponse[]
  ): MoreInformation[] => {
    return countries.map(this.CountryResponseToMoreInformation);
  };
}
