import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faUmbrella } from "@fortawesome/free-solid-svg-icons/faUmbrella";
import { useContext, useState } from "react";
import WeatherContext from "./WeatherContext.tsx";
import ToggleBtn from "./ToggleBtn.tsx";

export default function Header() {
  const { setPlaceName } = useContext(WeatherContext);
  const [inputValue, setInputValue] = useState<string>("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setPlaceName(inputValue.trim());
    }
  };

  return (
      <header className="fixed top-0 left-0 w-full bg-blue-500 dark:bg-blue-950 shadow-md z-50 px-4 py-2">
        <div className="flex justify-between items-center">
          {/* Логотип и заголовок */}
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faUmbrella} className="text-indigo-950 dark:text-white text-xl" />
            <h2 className="uppercase font-bold text-indigo-950 dark:text-white text-lg hidden sm:block">
              weather check
            </h2>
          </div>

          {/* Переключатель темы */}
          <ToggleBtn />
        </div>

        {/* Форма поиска */}
        <form
            onSubmit={handleSearch}
            className="mt-3 flex flex-col sm:flex-row sm:items-center gap-2"
        >
          <div className="relative w-full sm:w-auto sm:max-w-[300px]">
            <input
                type="text"
                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 outline-none text-base"
                placeholder="Search"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            />
          </div>

          <button
              type="submit"
              className="bg-blue-500 px-4 py-2 uppercase rounded-md text-indigo-950 dark:text-white hover:bg-blue-400 active:bg-blue-600 transition"
          >
            Find
          </button>
        </form>
      </header>
  );
}
