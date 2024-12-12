import { useContext } from "react";
import WeatherContext from "../components/WeatherContext.tsx";
import {
  rainy,
  snow,
  cloudy,
  storm,
  sun,
  wind,
  fog,
  mist,
  overcast,
} from "../assets/icons";

const weatherIcon: Record<string, string> = {
  Rain: rainy,
  Snow: snow,
  Cloud: cloudy,
  Storm: storm,
  Sun: sun,
  Wind: wind,
  Fog: fog,
  Mist: mist,
  Overcast: overcast,
};

const defaultIcon = sun;

const getWeatherIcon = (condition: string): string =>
    Object.entries(weatherIcon).find(([key]) =>
        condition.toLowerCase().includes(key.toLowerCase())
    )?.[1] || defaultIcon;

const MainPage = () => {
  const { weatherData, loading, error } = useContext(WeatherContext);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const { weatherIn, condition = "", temperature, localTime } = weatherData || {};
  const icon = getWeatherIcon(condition);

  return (
      <div className="flex justify-center items-start gap-10 h-full pt-20">
        <WeatherInfo
            weatherIn={weatherIn}
            temperature={temperature}
            condition={condition}
            localTime={localTime}
        />
        <WeatherIcon icon={icon} />
      </div>
  );
};

const WeatherInfo = ({
                       weatherIn,
                       temperature,
                       condition,
                       localTime,
                     }: {
  weatherIn: string;
  temperature: string | null;
  condition: string;
  localTime: string;
}) => {
  // Разделяем дату и время
  const [date, time] = localTime ? localTime.split(" ") : ["No data", "No data"];
  const formattedTemp = temperature ? `${parseInt(temperature)>0 ? "+" : ""}${parseInt(temperature)}`   : "No data";

  return (
      <div>
        <h2 className="text-xl font-bold">Weather in {weatherIn}</h2>
        <p className="text-lg">Temperature: {formattedTemp}</p>
        <p className="text-lg">Condition: {condition}</p>
        <p className="text-lg">Date: {date}</p>
        <p className="text-lg">Time: {time}</p>
      </div>
  );
};

const WeatherIcon = ({ icon }: { icon: string }) => (
    <div>
      <img alt="weather icon" src={icon} className="w-16 h-16 mt-4" />
    </div>
);

export default MainPage;
