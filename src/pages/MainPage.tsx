import { useContext, useEffect, useState } from "react";
import WeatherContext from "../components/WeatherContext.tsx";
import SavedCities from "../components/SavedCities.tsx";
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
  const [savedCities, setSavedCities] = useState<string[]>([]);
  const [cityTemperatures, setCityTemperatures] = useState<Record<string, string | null>>({});
  const [cityConditions, setCityConditions] = useState<Record<string, string>>({});
  const [cityLocalTimes, setCityLocalTimes] = useState<Record<string, string | null>>({});
  const [cityIcons, setCityIcons] = useState<Record<string, string>>({});

  useEffect(() => {
    const cities = JSON.parse(localStorage.getItem("savedCities") || "[]");
    setSavedCities(cities);
  }, []);

  useEffect(() => {
    if (weatherData?.weatherIn) {
      const city = weatherData.weatherIn;
      if (!savedCities.includes(city)) {
        const updatedCities = [...savedCities, city];
        setSavedCities(updatedCities);
        localStorage.setItem("savedCities", JSON.stringify(updatedCities));
      }

      // Обновляем данные о погоде для города
      setCityTemperatures((prev) => ({ ...prev, [city]: weatherData.temperature }));
      setCityConditions((prev) => ({ ...prev, [city]: weatherData.condition }));
      setCityLocalTimes((prev) => ({ ...prev, [city]: weatherData.localTime }));
      setCityIcons((prev) => ({ ...prev, [city]: getWeatherIcon(weatherData.condition) }));
    }
  }, [weatherData]);

  const removeCity = (cityName: string) => {
    const updatedCities = savedCities.filter((city) => city !== cityName);
    setSavedCities(updatedCities);
    localStorage.setItem("savedCities", JSON.stringify(updatedCities));

    // Удаляем данные о городе
    setCityTemperatures((prev) => {
      const { [cityName]: _, ...rest } = prev;
      return rest;
    });
    setCityConditions((prev) => {
      const { [cityName]: _, ...rest } = prev;
      return rest;
    });
    setCityLocalTimes((prev) => {
      const { [cityName]: _, ...rest } = prev;
      return rest;
    });
    setCityIcons((prev) => {
      const { [cityName]: _, ...rest } = prev;
      return rest;
    });
  };

  if (loading) return <p>Loading...</p>;

  return (
      <div className="flex flex-col items-center gap-10 h-full pt-10">
        {savedCities.length > 0 ? (
            <SavedCities
                savedCities={savedCities}
                cityTemperatures={cityTemperatures}
                cityConditions={cityConditions}
                cityLocalTimes={cityLocalTimes}
                cityIcons={cityIcons}
                onRemove={removeCity}
            />
        ) : (
            <p>Please enter your city and click FIND</p>
        )}

        {/* Ошибка всегда отображается внизу */}
        {error && <p className="text-red-500 mt-4">City not found</p>}
      </div>
  );
};

export default MainPage;
