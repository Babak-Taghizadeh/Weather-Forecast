import { UseQueryResult } from "@tanstack/react-query";

export interface WeatherContextType {
  weatherData: UseQueryResult<FetchedData>;
  setWeatherData: (data: UseQueryResult<FetchedData>) => void;
}
interface Condition {
    icon: string;
    text: string;
  }
  
  interface Location {
    country: string;
    name: string;
    region: string;
  }
  
  interface CurrentWeather {
    condition: Condition;
    humidity: number;
    temp_c: number;
    wind_kph: number;
    feelslike_c: number;
    pressure_in: number;
  }

interface HourlyForecast {
    time: string;
    condition: Condition;
    temp_c: number;
  }

  export interface Forecast {
    forecast: {
      forecastday: Array<{
        hour: HourlyForecast[];  // Array of hourly forecast objects
      }>;
    };
  }
  
  export interface FetchedData {
    location: Location; 
    current: CurrentWeather;
  }
