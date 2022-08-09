import React, {useState} from "react";
import "./App.scss";

const App = () => {
  const [latitude, setLatitude] = useState(null);
  const [Longitude, setLongitude] = useState(null);
  const [status, setStatus] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };

  return (
    <div className="App__container">
      <button onClick={getLocation}>Get Location</button>
      <h1>Coordinates</h1>
      <p>{status}</p>
      {latitude && <p>Latitude: {latitude}</p>}
      {Longitude && <p>Longitude: {Longitude}</p>}
    </div>
  );
};

export default App;
