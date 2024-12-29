import React from "react";
import CityCard from "./CityCard";

const SavedCities = ({
                       savedCities,
                       cityTemperatures,
                       cityConditions,
                       cityLocalTimes,
                       cityIcons,
                       onRemove,
                     }: {
  savedCities: string[];
  cityTemperatures: Record<string, string | null>;
  cityConditions: Record<string, string>;
  cityLocalTimes: Record<string, string | null>;
  cityIcons: Record<string, string>;
  onRemove: (cityName: string) => void;
}) => {
  return (
      <div className="flex flex-wrap gap-4 justify-center">
        {savedCities.map((city) => (
            <CityCard
                key={city}
                cityName={city}
                temperature={cityTemperatures[city] || "No data"}
                condition={cityConditions[city] || "No data"}
                localTime={cityLocalTimes[city] || "No data"}
                icon={cityIcons[city] || ""}
                onRemove={onRemove}
            />
        ))}
      </div>
  );
};

export default SavedCities;
