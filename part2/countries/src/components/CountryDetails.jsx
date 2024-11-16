import React from 'react';
import WeatherDetails from './WeatherDetails';

const CountryDetails = ({ name, capital, area, languages, flag, lat, lon }) => {
  return (
    <div>
      <h3>Country: {name}</h3>
      <h3>Capital: {capital}</h3>
      <h3>Area: {area}</h3>
      {languages && (
        <>
          <h4>Languages</h4>
          <ul>
            {Object.keys(languages).map((key) => {
              const value = languages[key];
              return <li key={key}>{value}</li>;
            })}
          </ul>
        </>
      )}
      <h3>Flag:</h3>
      <img src={flag} />
      <WeatherDetails lat={lat} lon={lon} />
    </div>
  );
};

export default CountryDetails;
