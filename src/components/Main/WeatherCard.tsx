import { useContext } from "react";
import { WeatherContext } from "../../App";
import defaultWeatherIcon from "../../assets/defaultWeather.svg";
import LoadingSpinner from "../../components/LoadingSpinner";

const WeatherCard = () => {
  const { weatherData } = useContext(WeatherContext);
  if (!weatherData) {
    return (
      <section className="flex flex-col h-[300px] justify-center items-center w-2/5 bg-gradient-to-b from-[#29323c] to-[#485563] rounded-3xl px-12 py-8">
        <LoadingSpinner className="h-16 w-16 border-blue-500" />
      </section>
    );
  }
  const { isError, isLoading, isFetching, error, data } = weatherData;

  const cityInfo = [
    {
      title: "Humidity:",
      text: `${data?.current?.humidity} g/Kg`,
    },
    {
      title: "Feels Like:",
      text: `${data?.current?.feelslike_c} °C`,
    },
    {
      title: "Wind Speed:",
      text: `${data?.current?.wind_kph} kph`,
    },
  ];

  if (isLoading || isFetching || !weatherData) {
    return (
      <section className="flex flex-col h-[300px] justify-center items-center w-2/5 bg-gradient-to-b from-[#29323c] to-[#485563] rounded-3xl px-12 py-8">
        <LoadingSpinner className="h-16 w-16 border-blue-500" />
      </section>
    );
  }

  if (isError && error instanceof Error) {
    return (
      <section className="flex flex-col h-[300px] justify-center items-center w-2/5 bg-gradient-to-b from-[#29323c] to-[#485563] rounded-3xl px-12 py-8">
        <h1>👈 Something Went Wrong Press Try Again</h1>
      </section>
    );
  }

  return (
    <section className="flex flex-col h-[300px] justify-between w-2/5 bg-gradient-to-b from-[#29323c] to-[#485563] rounded-3xl px-12 py-6">
      <div className="flex items-center gap-8">
        <h1 className="text-5xl">{`${data?.current?.temp_c} °C`}</h1>
        <img
          className="w-16 text-white"
          src={
            data?.current?.condition?.icon
              ? data?.current?.condition?.icon
              : defaultWeatherIcon
          }
          alt="status icon"
        />
        <h1 className="ml-auto text-4xl font-bold mt-10">
          {data?.current?.condition?.text}
        </h1>
      </div>
      <div className="flex justify-between">
        {cityInfo.map((item) => {
          return (
            <div key={item.title} className="flex flex-col gap-4 items-center">
              <h2 className="text-xl">{item.title}</h2>
              <p className="font-bold">{item.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WeatherCard;
