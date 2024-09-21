import { TiWeatherShower } from "react-icons/ti";

const WeatherCard = () => {
  return (
    <section className="flex flex-col h-[300px] justify-between w-2/5 bg-gradient-to-b from-[#29323c] to-[#485563] rounded-3xl px-12 py-8">
      <div className="flex gap-8">
        <h1 className="text-5xl">27 C</h1>
        <TiWeatherShower size={60} />
        <h1 className="ml-auto text-4xl font-bold mt-10">Partly Cloudy</h1>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col items-center">
          <h2 className="text-xl">HUMIDITY</h2>
          <p className="font-bold">80 %</p>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-xl">HUMIDITY</h2>
          <p className="font-bold">80 %</p>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-xl">HUMIDITY</h2>
          <p className="font-bold">80 %</p>
        </div>
      </div>
    </section>
  );
};

export default WeatherCard;
