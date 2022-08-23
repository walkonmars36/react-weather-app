import React from "react";

import "./HourlyForecast.scss";

const HourlyForecast = ({weather}) => {
  return (
    <div className="hourly">
      <h3>Hourly Forecast</h3>
      <div className="hourly-forecast">
        {weather &&
          weather.hourly
            .map((hour, index) => {
              const date = new Date(hour.dt * 1000);
              const hoursAndMinutes = date.toLocaleTimeString("default", {hour: "2-digit", minute: "2-digit"});
              const rain = (hour.pop * 100).toFixed(0);
              const temp = Math.round(hour.temp);

              return (
                <div key={index}>
                  <div className="hourly-forecast__items">
                    <p className="hourly-forecast__hour">{hoursAndMinutes}</p>
                    <img className="hourly-forecast__img" src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`} alt={hour.weather[0].description} />
                    <p>Rain?</p>
                    <p>{rain}&#37; </p>
                    <p className="hourly-forecast__temp">Temp</p>
                    <p>{temp}&#176;</p>
                  </div>
                </div>
              );
            })
            .slice(0, 24)}
      </div>
    </div>
  );
};

export default HourlyForecast;
