import React from "react";
import "./DailyRain.scss";

const DailyRain = ({weather}) => {
  return (
    <div className="daily">
      <div className="daily-precip">
        {weather &&
          weather.daily.map((day, index) => {
            const rain = (day.pop * 100).toFixed(0);

            return (
              <div className="daily-precip__items" key={index}>
                <p className="daily-precip__day">{rain}%</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DailyRain;
