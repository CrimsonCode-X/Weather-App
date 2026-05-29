import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (!city) return;

    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

    try {
      setLoading(true);
      setError("");
      setWeather(null);
      setForecast([]);

      // CURRENT WEATHER
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      const weatherData = await weatherRes.json();

      if (weatherData.cod !== 200) {
        setError(weatherData.message || "City not found");
        setLoading(false);
        return;
      }

      setWeather(weatherData);

      // FORECAST
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );

      const forecastData = await forecastRes.json();

      setForecast(forecastData.list || []);
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // 🌦️ IMAGE BACKGROUND LOGIC
  const getBackgroundImage = () => {
    if (!weather || !weather.weather) {
      return "https://images.unsplash.com/photo-1501630834273-4b5604d2ee31";
    }

    const condition = weather.weather[0].main.toLowerCase();

    if (condition.includes("clear")) {
      return "https://images.unsplash.com/photo-1502082553048-f009c37129b9";
    }

    if (condition.includes("cloud")) {
      return "https://images.unsplash.com/photo-1527766833261-b09c3163a791";
    }

    if (condition.includes("rain")) {
      return "https://images.unsplash.com/photo-1501691223387-dd0500403074";
    }

    if (condition.includes("snow")) {
      return "https://images.unsplash.com/photo-1608889175157-718b6205a2c7";
    }

    return "https://images.unsplash.com/photo-1501630834273-4b5604d2ee31";
  };

  return (
    <div
      className="app"
      style={{
        backgroundImage: `url(${getBackgroundImage()})`,
      }}
    >
      {/* HEADER */}
      <div className="header">
        Weather App 🌦️
      </div>

      {/* CENTER */}
      <div className="center">
        <SearchBar
          city={city}
          setCity={setCity}
          getWeather={getWeather}
        />

        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}
      </div>

      {/* WEATHER */}
      <WeatherCard weather={weather} />

      {/* FORECAST */}
      <Forecast forecast={forecast} />
    </div>
  );
};

export default App;