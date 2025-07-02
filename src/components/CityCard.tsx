import React from 'react';

type CityCardProps = {
  cityName: string;
  temperature: string | null;
  condition: string;
  localTime: string | null;
  icon: string;
  onRemove: (cityName: string) => void;
};

const CityCard: React.FC<CityCardProps> = ({
                                             cityName,
                                             temperature,
                                             condition,
                                             localTime,
                                             icon,
                                             onRemove,
                                           }) => {
  const [date, time] = localTime?.includes(" ") ? localTime.split(" ") : ["No data", "No data"];

  const parsedTemperature = temperature !== null ? parseInt(temperature) : null;

  const formattedTemp =
      parsedTemperature !== null
          ? `${parsedTemperature > 0 ? "+" : ""}${parsedTemperature}`
          : "No data";

  const getCardBackgroundColorClass = () => {
    if (parsedTemperature === null) {
      return 'bg-gray-400'; // Default for null, specify both desktop and mobile
    }
    if (parsedTemperature < 10) {
      return 'bg-blue-100 md:bg-blue-200'; // Cold
    }
    if (parsedTemperature < 25) {
      return 'bg-orange-100 md:bg-orange-200'; // Moderate
    }
    return 'bg-red-100 md:bg-red-200'; // Hot
  };

  return (
      <div
          className={`shadow-md flex flex-col items-center gap-4 p-8 md:p-4 rounded-xl w-full max-w-[25rem] ${getCardBackgroundColorClass()}`}
      >
        <h3 className="text-lg font-bold">Weather in {cityName}</h3>
        <p className="text-md">Temperature: {formattedTemp}</p>
        <p className="text-md">Condition: {condition}</p>
        <p className="text-md">Date: {date}</p>
        <p className="text-md">Time: {time}</p>
        <img alt={`Weather icon for ${condition}`} src={icon} className="w-16 h-16 mt-4" />
        <button
            className="mt-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            onClick={() => onRemove(cityName)}
        >
          Remove
        </button>
      </div>
  );
};

export default CityCard;
