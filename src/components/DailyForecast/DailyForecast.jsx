import React from "react";
import DailyPrecipitation from "../DailyPrecipitation/DailyPrecipitation";
import "./DailyForecast.scss";

const DailyForecast = ({weather}) => {
  return (
    <div className="daily">
      <h3>Daily Forecast</h3>
      <div className="daily-forecast">
        {weather &&
          weather.daily.map((day, index) => {
            // const temp = Math.round(day.temp.day);
            // const rain = day.pop * 100;

            return (
              <>
                <div className="daily-forecast__items" key={index}>
                  <p className="daily-forecast__day">{new Date(day.dt * 1000).toLocaleString("default", {weekday: "short"})}</p>
                  <img className="daily-forecast__img" src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt={day.weather[0].description} />
                  {/* 
                  <p>Rain</p>
                  <p>{rain}%</p>

                  <p>Temp</p>
                  <p>{temp}&#176;C </p> */}
                </div>
              </>
            );
          })}
      </div>
      <p>Chance of precipitation</p>
      <DailyPrecipitation weather={weather} />
      <p>Temperature</p>
    </div>
  );
};

export default DailyForecast;
