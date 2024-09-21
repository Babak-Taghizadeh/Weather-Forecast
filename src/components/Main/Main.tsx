import Search from "./Search"
import WeatherCard from "./WeatherCard"
const Main = () => {
  return (
    <main className="flex justify-evenly items-center w-full">
        <Search />
        <WeatherCard />
    </main>
  ) 
}

export default Main