
export type WeatherData = {
    weatherIn: string;
    temperature: string;
    condition: string;
    localTime: string;
};

export type WeatherContextType = {
    weatherData: WeatherData | null;
    loading: boolean;
    error: string | null;
    setPlaceName: () => {};
};
