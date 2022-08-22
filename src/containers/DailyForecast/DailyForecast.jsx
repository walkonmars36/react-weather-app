import React from "react";
import DailyRain from "../../components/DailyRain/DailyRain";
import DailyTemperature from "../../components/DailyTemperature/DailyTemperature";
import "./DailyForecast.scss";

const DailyForecast = ({weather}) => {
  return (
    <div className="daily">
      <h3>Daily Forecast</h3>
      <div className="daily-forecast">
        {weather &&
          weather.daily.map((day, index) => {
            // const rain = day.pop * 100;

            return (
              <>
                <div className="daily-forecast__items" key={index}>
                  <p className="daily-forecast__day">{new Date(day.dt * 1000).toLocaleString("default", {weekday: "short"})}</p>
                  <img className="daily-forecast__img" src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt={day.weather[0].description} />
                </div>
              </>
            );
          })}
      </div>
      <div className="tables">
        <p>Chance of rain</p>

        <DailyRain weather={weather} />

        <p>Temperature</p>
        <DailyTemperature weather={weather} />
      </div>
    </div>
  );
};

export default DailyForecast;
