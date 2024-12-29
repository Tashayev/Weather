const WeatherInfo = ({
                       weatherIn,
                       temperature,
                       condition,
                       localTime,
                     }: {
  weatherIn: string;
  temperature: string | null;
  condition: string;
  localTime: string;
}) => {
  const [date, time] = localTime ? localTime.split(" ") : ["No data", "No data"];
  const formattedTemp = temperature
      ? `${parseInt(temperature) > 0 ? "+" : ""}${parseInt(temperature)}`
      : "No data";

  return (
      <div>
        <h2 className="text-xl font-bold">Weather in {weatherIn}</h2>
        <p className="text-lg">Temperature: {formattedTemp}</p>
        <p className="text-lg">Condition: {condition}</p>
        <p className="text-lg">Date: {date}</p>
        <p className="text-lg">Time: {time}</p>
      </div>
  );
};

export default WeatherInfo;
