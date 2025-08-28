import Region from '../../../types/region.type';

class HelperRegion {
  public static ValidateQueryParams = (queryParam: string): Region => {
    queryParam = queryParam.toLowerCase();
    const ValidateParam: Record<string, Region> = {
      africa: 'Africa',
      americas: 'Americas',
      asia: 'Asia',
      europe: 'Europe',
      oceania: 'Oceania',
      antarctic: 'Antarctic',
    };

    return ValidateParam[queryParam] ?? 'Africa';
  };
}

export default HelperRegion;
