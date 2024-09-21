import { useContext } from "react";
import { WeatherContext } from "../../App";
import defaultWeatherIcon from "../../assets/defaultWeather.svg"
const WeatherCard = () => {
  const { weatherData } = useContext(WeatherContext);
  const cityInfo = [
    {
      title: "Humidity:",
      text: `${weatherData?.current?.humidity} °C`,
    },
    {
      title: "Feels Like:",
      text: `${weatherData?.current?.feelslike_c} °C`,
    },
    {
      title: "Wind Speed:",
      text: `${weatherData?.current?.wind_kph} g/Kg`,
    },
  ];

  if(!weatherData) return (
    <section className="flex flex-col h-[300px] justify-between w-2/5 bg-gradient-to-b from-[#29323c] to-[#485563] rounded-3xl px-12 py-8">
      Fuuuuuuuuuuuuuuuuuuuuuuuuuck
    </section>
  )

  return (
    <section className="flex flex-col h-[300px] justify-between w-2/5 bg-gradient-to-b from-[#29323c] to-[#485563] rounded-3xl px-12 py-8">
      <div className="flex items-center gap-8">
        <h1 className="text-5xl">{`${weatherData?.current?.temp_c} °C`}</h1>
        <img
          className="w-16 text-white"
          src={weatherData?.current?.condition?.icon ? weatherData?.current?.condition?.icon : defaultWeatherIcon}
          alt="status icon"
        />
        <h1 className="ml-auto text-4xl font-bold mt-10">
          {weatherData?.current?.condition?.text}
        </h1>
      </div>
      <div className="flex justify-between">
      {cityInfo.map((item) => {
        return (
          <div key={item.title} className="flex flex-col items-center pb-6">
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

{
  /* <div className="flex justify-between">
<div className="flex flex-col items-center">
  <h2 className="text-xl">Humidity:</h2>
  <p className="font-bold">{weatherData?.current?.humidity} g/kg</p>
</div>
<div className="flex flex-col items-center">
  <h2 className="text-xl">Feels Like:</h2>
  <p className="font-bold">{weatherData?.current?.feelslike_c} °C</p>
</div>
<div className="flex flex-col items-center gap-4">
  <h2 className="text-xl">Wind Speed:</h2>
  <p className="font-bold">{weatherData?.current?.wind_kph} kph</p>
</div>
</div> */
}
