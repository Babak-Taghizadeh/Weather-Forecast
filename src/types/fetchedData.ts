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
  
  export interface FetchedData {
    current: CurrentWeather; 
    location: Location; 
  }