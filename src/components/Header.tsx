import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faUmbrella } from "@fortawesome/free-solid-svg-icons/faUmbrella";
import { useContext, useState } from "react";
import WeatherContext from "./WeatherContext.tsx";
import ToggleBtn from "./ToggleBtn.tsx";

export default function Header() {
  const { setPlaceName } = useContext(WeatherContext);
  const [inputValue, setInputValue] = useState<string>('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // предотвращает перезагрузку страницы
    if (inputValue.trim()) {
      setPlaceName(inputValue.trim());
    }
  };

  return (
      <div className="fixed h-14 bg-blue-400 w-full flex items-center justify-around dark:bg-blue-950">
        <div className="flex items-center gap-1">
          <FontAwesomeIcon icon={faUmbrella} className="dark:text-white text-indigo-950" />
          <h2 className="uppercase font-bold hidden sm:block dark:text-white text-indigo-950">weather check</h2>
        </div>
        <ToggleBtn/>
        {/* Оборачиваем input и кнопку в form */}
        <form onSubmit={handleSearch} className="relative my-20 flex items-center">
          <input
              type="text"
              className="pl-10 py-2 pr-4 h-full border border-solid border-gray-300 rounded-lg outline-none text-base w-full max-w-[18.75rem] "
              placeholder="Search"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
          />
          <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
          <button
              type="submit"
              className="bg-blue-500 py-1 w-20 h-full uppercase ml-2 rounded-sm hover:bg-blue-400 active:bg-blue-700 dark:text-white text-indigo-950"
          >
            Find
          </button>
        </form>
      </div>
  );
}
