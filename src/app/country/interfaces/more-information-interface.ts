import type Country from './country.interface';

export interface MoreInformation extends Country {
  officialName: string;
  worldPopulationPct: string;
  area: number;
  density: string;
  languages: string[];
  currency: string[];
  gini: { year: string; val: number }[];
  borders: string[];
  demonyms: {
    f?: string;
    m?: string;
  };
  timezones: string[];
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
  flagAlt?: string;
  coatOfArms?: string;
  fifa?: string;
  tld?: string[];
  carSide: string;
}
