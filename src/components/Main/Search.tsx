import { IoSearch, IoLocationOutline } from "react-icons/io5";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState, useContext, useEffect } from "react";
import { WeatherContext } from "../../App";

const baseUrl = "http://api.weatherapi.com/v1/current.json";

const Search = () => {
  const [city, setCity] = useState<string>("");
  const { weatherData, setWeatherData } = useContext(WeatherContext);
  const fetchData = async() => {
    const { data } = await axios.get(baseUrl, {
      params: {
        key: import.meta.env.VITE_API_KEY,
        q: city || "tabriz",
      },
    });
    return data
  };

  const { isFetching, isLoading, isError, error, data, refetch } = useQuery({
    queryKey: ["WeatherData"],
    queryFn: fetchData,
    // enabled: false,
  });

  useEffect(() => {
    if (data) {
      setWeatherData(data);
      console.log(data);
      
    }
  }, [data, setWeatherData]);

  if (isLoading || isFetching) return <h1>Loading...</h1>;

  if (isError && error instanceof Error) return <h1>Error: {error.message}</h1>;

  return (
    <section className="flex flex-col gap-6 items-center">
      <div className="relative">
        <IoSearch
          size={30}
          color="black"
          className="absolute top-1/2 -translate-y-1/2 left-2"
        />
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full h-12 px-4 pl-12 rounded-xl placeholder:pl-4 text-black"
          placeholder="Search Location ..."
          type="text"
        />
      </div>
      <button
        className="border bg-slate-400 w-1/2 rounded-md text-xl p-2 text-stone-900"
        onClick={() => {
          refetch();
          setWeatherData(data?.data);
        }}
      >
        Search
      </button>
      <h1 className="flex items-center gap-2 text-4xl">
        <IoLocationOutline />
        <span>{weatherData?.location?.name || "Enter a valid city name"}</span>
      </h1>
    </section>
  );
};

export default Search;
