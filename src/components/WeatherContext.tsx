import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { WeatherData, WeatherContextType } from "../interfaces.tsx";

const WeatherContext = React.createContext<WeatherContextType>({
  weatherData: null,
  loading: true,
  error: null,
  setPlaceName: (name: string) => {},
});


export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [placeName, setPlaceName] = useState<string | null>(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_WEATHER_KEY || 'default_value_if_key_is_missing';

    const fetchWeatherData = async (query: string) => {
      try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query}`);
        const data = await response.json();

        setWeatherData({
          weatherIn: data.location.name,
          temperature: data.current.temp_c + ' °C',
          condition: data.current.condition.text,
          localTime: data.location.localtime,
        });
        setError(null);
      } catch (err) {
        setError('Не удалось получить данные о погоде');
      } finally {
        setLoading(false);
      }
    };

    const getLocationAndFetchWeather = async () => {
      if (placeName) {
        await fetchWeatherData(placeName); // Используем введенное название города
      } else if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          await fetchWeatherData(`${latitude},${longitude}`); // Используем координаты
        }, () => {
          setError('Не удалось определить местоположение');
          setLoading(false);
        });
      } else {
        setError('Геолокация не поддерживается вашим браузером');
        setLoading(false);
      }
    };

    getLocationAndFetchWeather();
  }, [placeName]); // Перезапуск при изменении placeName

  return (
      <WeatherContext.Provider value={{ weatherData, loading, error, setPlaceName }}>
        {children}
      </WeatherContext.Provider>
  );
};

export default WeatherContext;
