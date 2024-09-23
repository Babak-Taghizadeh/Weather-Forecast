import { useQueries, UseQueryResult } from "@tanstack/react-query";
import { useContext } from "react";
import { WeatherContext } from "../../App";
import axios from "axios";
import { Forecast } from "../../types/fetchedData";
import defaultWeatherIcon from "../../assets/defaultWeather.svg";
import LoadingSpinner from "../LoadingSpinner";

const baseUrl = "http://api.weatherapi.com/v1/forecast.json";

const fetchForecastByHour = async (
  date: string,
  hour: number,
  city: string
): Promise<Forecast> => {
  const { data } = await axios.get<Forecast>(baseUrl, {
    params: {
      key: import.meta.env.VITE_API_KEY,
      days: 1,
      q: city,
      hour,
      dt: date,
    },
  });
  return data;
};

const Footer = () => {
  const { weatherData } = useContext(WeatherContext);
  const selectedCity = weatherData?.data?.location.name

  const currentHour = new Date().getHours();
  const hoursToFetch = Array.from(
    { length: 5 },
    (_, i) => (currentHour + i + 1) % 24
  );

  const weatherForecastQueries = useQueries({
    queries: hoursToFetch.map((hour) => {
      const date = new Date();
      if (hour === 0) {
        date.setDate(date.getDate() + 1); // Increment the date by one day
      }
      const queryDate = date.toISOString().split("T")[0];
      return {
        queryKey: ["multiple hour", queryDate, hour, weatherData],
        queryFn: () => fetchForecastByHour(queryDate, hour, selectedCity!),
      };
    }),
  }) as UseQueryResult<Forecast>[];

  return (
    <div className="w-full mb-6 flex justify-evenly">
      {weatherForecastQueries.map((query, index) => {
        const { time, condition, temp_c } =
          query.data?.forecast?.forecastday?.[0]?.hour?.[0] || {};
        const displayTime = time ? time.split(" ")[1] : "--:--";
        const weatherIcon = condition?.icon || defaultWeatherIcon;
        const temperature = temp_c ? `${temp_c} °C` : "-- °C";
        if (query.isError) {
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center h-[110px] w-[100px]  bg-gradient-to-t from-[#243949] to-[#517fa4] rounded-xl py-2 px-3"
            >
              <h1>{query.error.message}</h1>
            </div>
          );
        }

        if (query.isLoading) {
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center h-[110px] w-[100px]  bg-gradient-to-t from-[#243949] to-[#517fa4] rounded-xl py-2 px-3"
            >
              <LoadingSpinner className="h-6 w-6 " />
            </div>
          );
        }
        return (
          <div
            key={index}
            className="flex flex-col items-center justify-between h-[110px] w-[100px] bg-gradient-to-t from-[#243949] to-[#517fa4] rounded-xl py-2 px-3"
          >
            <h1 className="text-xl">{displayTime}</h1>
            <img
              className="w-10 text-white"
              src={weatherIcon}
              alt="status icon"
            />
            <p className="text-lg">{temperature}</p>
          </div>
        );
      })}
    </div>
  );
};
export default Footer;
