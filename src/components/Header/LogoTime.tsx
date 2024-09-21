import { TiWeatherPartlySunny } from "react-icons/ti";
import { useEffect, useState } from "react";

const LogoTime = () => {
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("")

  useEffect(() => {

    const getDate = () => {
      const dateObject = new Date();
      const month = dateObject.getMonth() + 1;
      const year = dateObject.getFullYear();
      const date = dateObject.getDate();
      const today = `${month}/${date}/${year}`
      setDate(today)
    }

    getDate()
    const updateTime = () => {
      const dateObject = new Date();
      const hour = dateObject.getHours().toString().padStart(2, "0");
      const minute = dateObject.getMinutes().toString().padStart(2, "0");
      const currentTime = `${hour} : ${minute}`;
      setTime(currentTime);
    };
    updateTime();

    const intervalId = setInterval(() => {
      updateTime();
      console.log("rendered");
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative self-end flex gap-4">
      <span>
        <TiWeatherPartlySunny color="white" size={100} />
      </span>
      <span className="text-6xl text-white font-bold">
        Weather <br /> Talk{" "}
        <span className="animate-pulse text-3xl absolute bottom-0 -right-44">
          {`${time} - ${date}`}
        </span>
      </span>
    </div>
  );
};

export default LogoTime;
