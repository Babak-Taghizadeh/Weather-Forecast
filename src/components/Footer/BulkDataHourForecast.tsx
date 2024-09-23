// TO DO: HANDLING FETCHED DATA;
// TO GET COMPLETED;

import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"
import { WeatherContext } from "../../App"
import LoadingSpinner from "../LoadingSpinner"
import axios from "axios"

const baseUrl = "http://api.weatherapi.com/v1/forecast.json";

const fetchBulkForecastByHour = async(
    date: string,
    city: string
) => {
    const { data } = await axios.get(baseUrl, {
        params: {
            q: city,
            days: 1,
            dt: date,
            tp: 12
        }
    })
    return data
}

const BulkDataHourForecast = () => {
    const { weatherData } = useContext(WeatherContext)

    const { isLoading, isError, data, error, isFetching } = useQuery({
        queryKey: ["bulk hour"],
        queryFn: () => fetchBulkForecastByHour
    })

    if (isError && error instanceof Error) {
        return (
            <div className="w-1/2 h-24 bg-black">
                Something went wrong:
                {error.message}
            </div>
        )
    }

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
  )
}

export default BulkDataHourForecast