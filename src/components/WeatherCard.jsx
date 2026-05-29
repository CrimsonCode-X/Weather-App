const getWeatherIcon = (condition) => {
  if (!condition) return "🌈";

  const c = condition.toLowerCase();

  if (c.includes("cloud")) return "☁️";
  if (c.includes("rain")) return "🌧️";
  if (c.includes("clear")) return "☀️";
  if (c.includes("snow")) return "❄️";
  if (c.includes("thunder")) return "⛈️";
  if (c.includes("mist") || c.includes("fog")) return "🌫️";

  return "🌈";
};

const WeatherCard = ({ weather }) => {
  if (!weather || !weather.main) return null;

  return (
    <div className="card">
      <div className="icon">
        {getWeatherIcon(weather.weather?.[0]?.main)}
      </div>

      <h2>{weather.name}</h2>
      <h1>{weather.main.temp}°C</h1>
      <p>{weather.weather?.[0]?.main}</p>
    </div>
  );
};

export default WeatherCard;