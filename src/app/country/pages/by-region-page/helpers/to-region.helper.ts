import Region from '../../../types/region.type';

class HelperRegion {
  public static ValidateQueryParams = (queryParam?: string): Region => {
    if (!queryParam) return 'Africa';

    const ValidateParam: Record<string, Region> = {
      africa: 'Africa',
      americas: 'Americas',
      asia: 'Asia',
      europe: 'Europe',
      oceania: 'Oceania',
      antarctic: 'Antarctic',
    };

    return ValidateParam[queryParam.toLowerCase()] ?? 'Africa';
  };
}

export default HelperRegion;
