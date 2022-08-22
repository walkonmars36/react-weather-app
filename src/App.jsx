import React, {useState} from "react";
import {useEffect} from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import CurrentWeather from "./containers/CurrentWeather/CurrentWeather";
import DailyForecast from "./containers/DailyForecast/DailyForecast";
import HourlyForecast from "./containers/HourlyForecast/HourlyForecast";

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

  return (
    <div className="app">
      <div className="app__container">
        <Header />

        <h3>{loading}</h3>

        <CurrentWeather locationResult={locationResult} weather={weather} />

        <HourlyForecast weather={weather} />

        <DailyForecast weather={weather} />
      </div>
    </div>
  );
};

export default App;
