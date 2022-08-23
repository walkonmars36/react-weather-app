import React from "react";
import "./CurrentWeather.scss";

const CurrentWeather = ({locationResult, weather, loading}) => {
  return (
    <div className="current-weather">
      <h2>{loading}</h2>
      {locationResult && <h2>Here's the weather in {locationResult[0].name}</h2>}

      <div className="current-weather__location">
        <div className="current-weather__location-left">
          <p>Currently</p>
          <p className="current-weather__location-left-degrees">{weather && Math.round(weather.current.temp)}&#176;</p>
          <p>{weather && weather.current.weather[0].description}</p>
        </div>

        <div className="current-weather__location-right">
          {weather && <img className="current-weather__location-right-img" src={`http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`} alt="blah" />}
          <p>feels like {weather && Math.trunc(weather.current.feels_like)}&#176;</p>
          <p>windspeed {weather && Math.trunc(weather.current.wind_speed)} km/h</p>
        </div>
      </div>
      <div className="current-weather__rise-set">
        <p>sunrise: {weather && new Date(weather.current.sunrise * 1000).toTimeString().slice(0, 5)} </p>
        <p>sunset: {weather && new Date(weather.current.sunset * 1000).toTimeString().slice(0, 5)} </p>
        <p>High {weather && Math.round(weather.daily[0].temp.max)}&#176; </p>
        <p>Low {weather && Math.round(weather.daily[0].temp.min)}&#176;</p>
      </div>
    </div>
  );
};

export default CurrentWeather;
