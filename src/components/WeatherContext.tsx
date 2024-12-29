import { createContext, useState, useEffect, ReactNode } from 'react';
import { WeatherData, WeatherContextType } from "../interfaces.tsx";

const WeatherContext = createContext<WeatherContextType>({
  weatherData: null,
  loading: true,
  error: null,
  setPlaceName: () => {}, // Заглушка по умолчанию
});

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [placeName, setPlaceName] = useState<string | null>(null);
  const [savedCities, setSavedCities] = useState<string[]>([]);

  // Загрузка сохраненных городов при загрузке компонента
  useEffect(() => {
    const cities = JSON.parse(localStorage.getItem("savedCities") || "[]");
    setSavedCities(cities);
  }, []);

  // Сохранение города в localStorage
  useEffect(() => {
    if (savedCities.length > 0) {
      localStorage.setItem("savedCities", JSON.stringify(savedCities));
    }
  }, [savedCities]);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_WEATHER_KEY || 'default_value_if_key_is_missing';

    const fetchWeatherData = async (query: string) => {
      try {
        setLoading(true);
        setError(null); // Сбрасываем сообщение об ошибке перед новым запросом

        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query}`
        );

        if (!response.ok) {
          throw new Error("City not found");
        }

        const data = await response.json();

        if (!data || !data.location || !data.current) {
          throw new Error("Invalid data received from API");
        }

        setWeatherData({
          weatherIn: data.location.name,
          temperature: data.current.temp_c + " °C",
          condition: data.current.condition.text,
          localTime: data.location.localtime,
        });
        setError(null); // Убираем ошибку, если запрос успешен
      } catch (err) {
        setError(err.message || "Не удалось получить данные о погоде");
        // Не очищаем weatherData, чтобы оставить существующий контент
      } finally {
        setLoading(false);
      }
    };

    const getLocationAndFetchWeather = async () => {
      if (placeName) {
        await fetchWeatherData(placeName); // Используем введенное название города
      } else if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              await fetchWeatherData(`${latitude},${longitude}`); // Используем координаты
            },
            () => {
              setError('Не удалось определить местоположение');
              setLoading(false);
            }
        );
      } else {
        setError('Геолокация не поддерживается вашим браузером');
        setLoading(false);
      }
    };

    getLocationAndFetchWeather();
  }, [placeName]);

  const addCity = (city: string) => {
    if (!savedCities.includes(city)) {
      const updatedCities = [...savedCities, city];
      setSavedCities(updatedCities); // Обновляем список городов
    }
  };

  return (
      <WeatherContext.Provider value={{ weatherData, loading, error, setPlaceName, addCity }}>
        {children}
      </WeatherContext.Provider>
  );
};

export default WeatherContext;
