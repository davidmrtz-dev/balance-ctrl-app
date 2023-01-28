export type MapLayerColors = 'red' | 'blue' | 'green';

export interface City {
  city: string;
  country: string;
  countryCode: string;
  distance: number;
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  population: number;
  region: string;
  regionCode: string;
  type: string;
  wikiDataId: string;
};

export const validCityKeys = ['name', 'country', 'region', 'distance'];

export interface ThirdSection extends Wind, Rain, Clouds {};
export interface Content {
  firstSection: Weather | undefined,
  secondSection: Main | undefined,
  thirdSection: ThirdSection | undefined;
}

export interface WeatherResponse {
  weather?: Weather [];
  main?: Main;
  wind?: Wind;
  rain?: Rain;
  clouds?: Clouds;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Main {
  temp?: number;
  feels_like?: number;
  temp_min?: number;
  pressure: number;
  temp_max?: number;
  humidity?: number;
  sea_level?: number;
  grnd_level?: number;
}

export interface Wind {
  speed?: number;
  deg?: number;
  gust?: number;
}

export interface Rain {
  '1h'?: number;
}

export interface Clouds {
  all: number;
}
