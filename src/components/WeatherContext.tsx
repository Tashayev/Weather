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
    } catch (err: unknown) { // Явное указание типа err как unknown
      if (err instanceof Error) {
        setError(err.message || "Не удалось получить данные о погоде"); // Обработка ошибки как экземпляра Error
      } else {
        setError("Неизвестная ошибка");
      }
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
}, [placeName]); // Перезапуск при изменении placeName
