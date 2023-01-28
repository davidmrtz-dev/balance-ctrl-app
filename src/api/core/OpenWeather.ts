import { LatLngLiteral } from "leaflet";
import { WeatherResponse } from '../../@types';

export const getWeatherByLocation = async (location: LatLngLiteral): Promise<WeatherResponse> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lng}&appid=c7f8ceb3a741a54e536808e9a71a51ca`
  );
  const data = await response.json();
  if (data.message) throw Error;
  return data;
};
