
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
    addCity: (city: string)=>{};
    setPlaceName: (place: string) => void;

};
export type CityCardProps = {
  cityName: string;
  onRemove: (cityName: string) => void;
  temperture: string | null;
};
