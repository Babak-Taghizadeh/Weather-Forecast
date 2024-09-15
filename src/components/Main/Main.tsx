import { useState } from "react";
import WeatherCard from "./WeatherCard"
// import axios from "axios"

// const baseUrl ="https://api.weatherapi.com/v1/"
const Main = () => {
  const useT = useState("second")
  console.log(useT);
  
  return (
    <main className="flex px-36 justify-evenly w-full">
        <section className="flex flex-col">
            <input type="text" />
            <h2>Tabriz, Iran</h2>
        </section>
        <WeatherCard />
    </main>
  ) 
}

export default Main