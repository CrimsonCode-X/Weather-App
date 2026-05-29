const Forecast = ({ forecast }) => {
  if (!forecast || forecast.length === 0) return null;

  const groupForecastByDay = (list) => {
    const days = {};

    list.forEach((item) => {
      const date = item.dt_txt.split(" ")[0];

      if (!days[date]) {
        days[date] = {
          temps: [],
          weather: item.weather[0].main,
        };
      }

      days[date].temps.push(item.main.temp);
    });

    return Object.keys(days).map((date) => {
      const temps = days[date].temps;

      return {
        date,
        avgTemp: temps.reduce((a, b) => a + b, 0) / temps.length,
        weather: days[date].weather,
      };
    });
  };

  const groupedForecast = groupForecastByDay(forecast);

  return (
    <div className="forecast">
      <h3>5 Day Forecast 🌤️</h3>

      <div className="forecast-row">
        {groupedForecast.slice(0, 5).map((day, index) => (
          <div key={index} className="forecast-card">
            <p className="forecast-date">
              {new Date(day.date).toDateString().slice(0, 10)}
            </p>

            <p className="forecast-temp">
              {day.avgTemp.toFixed(1)}°C
            </p>

            <p className="forecast-condition">
              {day.weather}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;