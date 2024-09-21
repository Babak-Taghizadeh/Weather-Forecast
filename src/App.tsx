import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState, createContext, useMemo } from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import { FetchedData } from "./types/fetchedData";

const queryClient = new QueryClient();
export const WeatherContext = createContext<{
  weatherData: FetchedData;
  setWeatherData: (weatherData: FetchedData) => void;
}>({ weatherData: {} as FetchedData, setWeatherData: () => {} });

function App() {
  const [weatherData, setWeatherData] = useState<FetchedData>(
    {} as FetchedData
  );

  const weatherContextValue = useMemo(() => ({
    weatherData,
    setWeatherData,
  }), [weatherData]);
  
  return (
    <WeatherContext.Provider value={weatherContextValue}>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-dvh flex flex-col text-white justify-between items-center bg-gradient-to-b from-[#000000] to-[#434343]">
          <Header />
          <Main />
          <Footer />
        </div>
      </QueryClientProvider>
    </WeatherContext.Provider>
  );
}

export default App;
