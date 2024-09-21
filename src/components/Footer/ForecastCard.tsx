import { TiWeatherPartlySunny } from "react-icons/ti";
const ForecastCard = () => {
  return (
    <div className="flex flex-col items-center justify-between h-[110px] w-[100px]  bg-gradient-to-t from-[#243949] to-[#517fa4] rounded-xl py-2 px-3">
        <h1>1:00 am</h1>
        <TiWeatherPartlySunny size={25} />
        <p className="text-xl">30 c</p>
    </div>
  )
}

export default ForecastCard