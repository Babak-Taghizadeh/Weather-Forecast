import { IoSearch, IoLocationOutline } from "react-icons/io5";
import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useState, useContext, useEffect } from "react";
import { WeatherContext } from "../../App";
import debounce from "lodash.debounce";
import { FetchedData } from "../../types/fetchedData";

const baseUrl = "http://api.weatherapi.com/v1/current.json";

const Search = () => {
  const [city, setCity] = useState<string>("");
  const { setWeatherData } = useContext(WeatherContext);
  const fetchData = async () => {
    const { data } = await axios.get(baseUrl, {
      params: {
        key: import.meta.env.VITE_API_KEY,
        q: city || "tabriz",
      },
    });
    return data;
  };

  const { isFetching, isLoading, isError, error, data, refetch } = useQuery({
    queryKey: ["WeatherData"],
    queryFn: fetchData,
    // enabled: false,
  });

  useEffect(() => {
    setWeatherData({
      data,
      isLoading,
      isError,
      error,
      isFetching,
    } as UseQueryResult<FetchedData>);
  }, [data, isLoading, isError, error, isFetching, setWeatherData]);

  const handleCityChange = debounce((value: string) => {
    setCity(value);
  }, 150);

  if (isError && error instanceof Error) {
    return (
      <div className="flex flex-col items-center gap-4">
        <h1>Error: {error.message}</h1>
        <button
          className="w-1/2 rounded-md text-xl p-2 bg-blue-500"
          onClick={() => {
            setCity("tabriz");
            refetch();
          }}
        >
          Try again
        </button>
      </div>
    );
  }
  return (
    <section className="flex flex-col gap-6 items-center">
      <h1 className="flex items-center gap-2 text-4xl mb-8">
        <IoLocationOutline />
        <span>{data?.location.name}</span>
      </h1>
      <div className="relative">
        <IoSearch
          size={30}
          color="black"
          className="absolute top-1/2 -translate-y-1/2 left-2"
        />
        <input
          value={city}
          onChange={(e) => handleCityChange(e.target.value)}
          className="w-full h-12 px-4 pl-12 rounded-xl placeholder:pl-4 text-black"
          placeholder="Search Location ..."
          type="text"
        />
      </div>
      <button
        className="border bg-slate-400 w-1/2 rounded-md text-xl p-2 text-stone-900 disabled:bg-gray-100 disabled:opacity-10"
        onClick={() => {
          refetch();
        }}
        disabled={isFetching || isLoading || !city ? true : false}
      >
        Search
      </button>
    </section>
  );
};

export default Search;
