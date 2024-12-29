const CityCard = ({
                    cityName,
                    temperature,
                    condition,
                    localTime,
                    icon,
                    onRemove,
                  }: {
  cityName: string;
  temperature: string | null;
  condition: string;
  localTime: string | null;
  icon: string;
  onRemove: (cityName: string) => void;
}) => {
  const [date, time] = localTime ? localTime.split(" ") : ["No data", "No data"];
  const formattedTemp = temperature
      ? `${parseInt(temperature) > 0 ? "+" : ""}${parseInt(temperature)}`
      : "No data";

  return (
      <div className="p-4 bg-blue-200 rounded shadow-md flex flex-col items-center gap-4">
        <h3 className="text-lg font-bold">Weather in {cityName}</h3>
        <p className="text-md">Temperature: {formattedTemp}</p>
        <p className="text-md">Condition: {condition}</p>
        <p className="text-md">Date: {date}</p>
        <p className="text-md">Time: {time}</p>
        <img alt="weather icon" src={icon} className="w-16 h-16 mt-4" />
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
