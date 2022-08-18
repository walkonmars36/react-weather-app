import React, {useState} from "react";
import {useEffect} from "react";
import "./App.scss";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [locationResult, setLocationResult] = useState(null);
  const [weather, setWeather] = useState(null);

  const API_KEY = process.env.REACT_APP_API_KEY;
  const GEO_KEY = process.env.REACT_APP_GEO_KEY;
  const units = "metric";

  // geolocation
  useEffect(() => {
    if (!navigator.geolocation) {
      setLoading("Geolocation is not supported by your browser");
    } else {
      setLoading("Finding your location...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLoading(null);
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        () => {
          setLoading("Unable to retrieve your location");
        }
      );
    }
  }, []);

  // reverse geocoding
  useEffect(() => {
    if (latitude && longitude)
      fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${GEO_KEY}`)
        .then((response) => response.json())
        .then((data) => {
          setLocationResult(data);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [GEO_KEY, latitude, longitude]);

  // weather
  useEffect(() => {
    if (locationResult) {
      const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=${units}&appid=${API_KEY}`;
      fetch(url)
        .then((response) => {
          if (!response.ok) throw new Error("Something went wrong");
          return response.json();
        })
        .then((data) => {
          setWeather(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [locationResult, latitude, longitude, API_KEY]);

  const currentHour = new Date().getHours();
  let greetingImg = "";
  let greetingTime = "Morning";

  if (currentHour >= 12) {
    greetingImg = "";
    greetingTime = "Afternoon";
  }

  if (currentHour >= 18) {
    greetingImg = "";
    greetingTime = "Evening";
  }

  return (
    <div className="app">
      <div className="app__container">
        <h1>Good {greetingTime}</h1>
        <h3>{loading}</h3>

        <h2>{locationResult && locationResult[0].name}</h2>
        <p>Currently - {weather && Math.round(weather.current.temp)}&#176;C</p>
        <p>{weather && weather.current.weather[0].description}</p>
        <div>
          {weather &&
            weather.daily.map((day) => {
              const dayTime = new Date(day.dt * 1000).toDateString();
              const temp = Math.round(day.temp.day);
              const sunrise = new Date(day.sunrise * 1000).toTimeString().slice(0, 5);
              const sunset = new Date(day.sunset * 1000).toTimeString().slice(0, 5);

              return (
                <div className="daily-weather" key={day.dt}>
                  <p>{dayTime}</p>

                  <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png`} alt={day.weather[0].description} />

                  <p>{day.weather[0].description.charAt(0).toUpperCase() + day.weather[0].description.slice(1)}</p>
                  <p>High {temp}&#176;C </p>
                  <p>Sunrise {sunrise}</p>
                  <p>Sunset {sunset}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default App;
