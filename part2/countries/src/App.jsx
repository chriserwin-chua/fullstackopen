import { useState, useEffect } from 'react';
import axios from 'axios';
import CountryDetails from './components/CountryDetails';
const App = () => {
  const [textQuery, setTextQuery] = useState('');
  const [results, setResults] = useState([]);
  const [filteredResult, setFileredResult] = useState([]);
  const [countryDetails, setCountryDetails] = useState();

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setResults(response.data);
      });
  }, []);

  useEffect(() => {
    if (textQuery && results) {
      const isMatch = (text, result) => {
        return result.toLowerCase().includes(text.toLowerCase());
      };
      setFileredResult(
        results.filter((result) => isMatch(textQuery, result.name.common))
      );
    }
  }, [textQuery]);

  const renderResult = () => {
    if (!filteredResult) return null;

    if (filteredResult.length === 1) {
      return (
        <CountryDetails
          name={filteredResult[0].name.common}
          capital={filteredResult[0].capital}
          area={filteredResult[0].area}
          flag={filteredResult[0].flags['png']}
          languages={filteredResult[0].languages}
          lat={filteredResult[0].latlng[0]}
          lon={filteredResult[0].latlng[1]}
        />
      );
    }

    if (filteredResult.length < 10) {
      return filteredResult.map((result) => {
        return (
          <li key={result.name.common}>
            {result.name.common}{' '}
            <button onClick={() => setCountryDetails(result)}>Show</button>
          </li>
        );
      });
    }

    return <li>Too many matches, specify another filter</li>;
  };
  return (
    <div>
      find countries:
      <input value={textQuery} onChange={(e) => setTextQuery(e.target.value)} />
      <ul>{renderResult()}</ul>
      {countryDetails &&
        filteredResult.length !== 1 &&
        filteredResult.length < 10 && (
          <CountryDetails
            name={countryDetails.name.common}
            capital={countryDetails.capital}
            area={countryDetails.area}
            flag={countryDetails.flags['png']}
            languages={countryDetails.languages}
            lat={countryDetails.latlng[0]}
            lon={countryDetails.latlng[1]}
          />
        )}
    </div>
  );
};

export default App;
