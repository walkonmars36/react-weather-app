import React from "react";
import "./DailyPrecipitation.scss";

const DailyPrecipitation = ({weather}) => {
  return (
    <div className="daily">
      <div className="daily-precip">
        {weather &&
          weather.daily.map((day, index) => {
            return (
              <div className="daily-precip__items" key={index}>
                <p className="daily-precip__day">{day.pop * 100}%</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DailyPrecipitation;
