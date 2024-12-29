const WeatherIcon = ({ icon }: { icon: string }) => (
    <div>
      <img alt="weather icon" src={icon} className="w-16 h-16 mt-4" />
    </div>
);

export default WeatherIcon;
