
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
    setPlaceName: (place: string) => void;
    addCity: (city: string)=>void;



};
export type CityCardProps = {
  cityName: string;
  onRemove: (cityName: string) => void;
  temperature: string | null;
};
