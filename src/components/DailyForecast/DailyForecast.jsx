import React from "react";
import "./DailyForecast.scss";

const DailyForecast = ({weather}) => {
  return (
    <div>
      <h3>Daily Forecast</h3>
      {weather &&
        weather.daily.map((day) => {
          const temp = Math.round(day.temp.day);

          return (
            <div className="daily-forecast" key={day.dt}>
              <p>{new Date(day.dt * 1000).toLocaleString("default", {weekday: "short"})}</p>
              <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt={day.weather[0].description} />

              {/* <p>Chance of precipitation</p>
              <p>{day.pop}%</p>

              <p>Temperature</p>
              <p>{temp}&#176;C </p> */}
            </div>
          );
        })}
    </div>
  );
};

export default DailyForecast;
