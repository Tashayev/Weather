import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from "react";
import WeatherContext from "./WeatherContext.tsx";

export default function Header() {
  const { setPlaceName } = useContext(WeatherContext);
  const [inputValue, setInputValue] = useState<string>('');

  const handleSearch = () => {
    if (inputValue.trim()) {
      setPlaceName(inputValue.trim());
      saveCityToLocalStorage(inputValue.trim()); // Сохраняем город в localStorage
    }
  };

  const saveCityToLocalStorage = (city: string) => {
    const savedCities = JSON.parse(localStorage.getItem('savedCities') || '[]');
    if (!savedCities.includes(city)) {
      savedCities.push(city);
      localStorage.setItem('savedCities', JSON.stringify(savedCities));
    }
  };

  return (
      <div className="sticky h-14 bg-blue-500 w-full flex items-center justify-around">
        <h2 className="uppercase text-white font-bold">weather check</h2>
        <div className="relative my-20">
          <input
              type="text"
              className="pl-10 py-1 pr-4 h-full border border-gray-300 rounded-md outline-none"
              placeholder="Search"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
          />
          <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
          <button
              className="bg-blue-500 py-1 w-20 h-full text-white uppercase ml-2 rounded-sm hover:bg-blue-400 active:bg-blue-700"
              onClick={handleSearch}
          >
            Find
          </button>
        </div>
      </div>
  );
}
