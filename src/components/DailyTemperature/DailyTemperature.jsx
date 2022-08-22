import React from "react";
import "./DailyTemperature.scss";

const DailyTemperature = ({weather}) => {
  return (
    <div className="daily">
      <div className="daily-precip">
        {weather &&
          weather.daily.map((day, index) => {
            const temp = Math.round(day.temp.day);

            return (
              <div className="daily-precip__items" key={index}>
                <p className="daily-precip__day">{temp}%</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DailyTemperature;
