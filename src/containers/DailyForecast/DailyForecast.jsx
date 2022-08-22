import React from "react";

import "./DailyForecast.scss";

const DailyForecast = ({weather}) => {
  return (
    <div className="daily">
      <h3>Daily Forecast</h3>
      <div className="daily-forecast">
        {weather &&
          weather.daily.map((day, index) => {
            const rain = (day.pop * 100).toFixed(0);
            const temp = Math.round(day.temp.day);

            return (
              <>
                <div className="daily-forecast__items" key={index}>
                  <p className="daily-forecast__day">{new Date(day.dt * 1000).toLocaleString("default", {weekday: "short"})}</p>
                  <img className="daily-forecast__img" src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt={day.weather[0].description} />
                  <p>Rain?</p>
                  <p>{rain}&#37;</p>
                  <p className="daily-forecast__temp">Temp</p>
                  <p>{temp}&#176;</p>
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
};

export default DailyForecast;
