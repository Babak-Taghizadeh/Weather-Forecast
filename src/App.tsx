import {
  QueryClientProvider,
  QueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { useState, createContext, useMemo } from "react";
import Footer from "./components/Footer/MultiQuerisHourForecast";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import { FetchedData } from "./types/fetchedData";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { WeatherContextType } from "./types/fetchedData";

const queryClient = new QueryClient();

export const WeatherContext = createContext<WeatherContextType>({
  weatherData: {} as UseQueryResult<FetchedData>,
  setWeatherData: () => {},
});

function App() {
  const [weatherData, setWeatherData] = useState<UseQueryResult<FetchedData>>(
    {} as UseQueryResult<FetchedData>
  );

  const weatherContextValue = useMemo(
    () => ({
      weatherData,
      setWeatherData,
    }),
    [weatherData]
  );

  return (
    <WeatherContext.Provider value={weatherContextValue}>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-dvh flex flex-col text-white justify-between items-center bg-gradient-to-b from-[#000000] to-[#434343]">
          <Header />
          <Main />
          <Footer />
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </WeatherContext.Provider>
  );
}

export default App;
