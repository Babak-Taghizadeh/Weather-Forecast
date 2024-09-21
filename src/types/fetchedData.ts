export interface FetchedData {
  current?: {
    condition: {
      icon: string;
      text: string;
    };
    humidity: number;
    temp_c: number;
    wind_kph: number;
    feelslike_c: number;
    pressure_in: number;
  };
  location: {
    country: string;
    name: string;
    region: string;
  };
}
