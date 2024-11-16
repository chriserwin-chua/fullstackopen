import React, { useState, useEffect } from 'react';
import axios from 'axios';
const WeatherDetails = ({ lon, lat }) => {
  const openWeatherIconUrl = (iconId) =>
    `https://openweathermap.org/img/wn/${iconId}@2x.png`;
  const api_key = import.meta.env.VITE_OPENWEATHER_KEY;
  const [weather, setWeather] = useState();

  useEffect(() => {
    if (lat && lon)
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`
        )
        .then((response) => setWeather(response.data));
  }, [lat, lon]);

  if (!weather) {
    return null;
  }

  return (
    <div>
      <h2>Weather in {weather.name}</h2>
      <h3>Temperature: {weather.main.temp} Celsius</h3>
      <img src={openWeatherIconUrl(weather.weather[0].icon)} />
      <h3>Wind: {weather.wind.speed} m/s</h3>
    </div>
  );
};

export default WeatherDetails;
