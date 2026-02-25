import { useState, useEffect } from "react";
import './App.css'

function App() {
  const [city, setCity] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!searchCity) return;

    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError("");

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=metric&appid=d64782f8f0fadb4aceae539a02d5939c`
      );

      if (!res.ok) {
          throw new Error("City not found");
        }

        const data = await res.json();
        setWeather(data);
      } catch (err) {
        setError(err.message);
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [searchCity]);

  return (
    <div>
      <h1>Weather App</h1>

      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={() => setSearchCity(city)}>
        Search
      </button>

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].main}</p>
        </div>
      )}
    </div>
  );
}

export default App;