import React, { useEffect, useState, useRef } from 'react';
import CountriesDropdown from './components/CountriesDropdown'
import CountriesList from './components/CountriesList';
import './App.css';

function App() {
  const [countries, setcountries] = useState([]);
  const [dropDownValues, setdropDownValues] = useState([])
  const [headers, setheaders] = useState([])
  const [sortOrder, setsortOrder] = useState('none')
  const previousCountries = useRef(countries);

  const uuid = (function uuid() {
    var i = 0;
    return function inner() {
      return ++i;
    }
  })()

  const fetchCountryList = () => {
    fetch('https://restcountries.eu/rest/v2/all?fields=name;capital;languages;currencies;region;subregion;population;area')
      .then(res => res.json())
      .then(res => {
        res.forEach(item => {
          if(!item.area) {
            item.area = 0
          }
        });
        setcountries(res);
        setdropDownValues(res);
        sessionStorage.setItem('countriesCopy', JSON.stringify(res));
      });
  };

  useEffect(() => {
    fetchCountryList();
  }, []);

  useEffect(() => {
    if (previousCountries.current !== countries) {
      const keyList = Object.keys(countries[0])
      setheaders(keyList);
    }
  }, [countries]);

  const handleChange = e => {
    if (e.target.value === '--Select Country--') {
      var fetchCountries = JSON.parse(sessionStorage.getItem("countriesCopy"));
      setcountries(fetchCountries);
    } else {
      const storedCountries = JSON.parse(sessionStorage.getItem("countriesCopy"));
      const filteredCountry = storedCountries.filter(country => country.name === e.target.value);
      setcountries(filteredCountry);
    }
  };

  const sortCountryList = () => {
    if (sortOrder === 'none') {
      const sortedCountry = countries.sort((a, b) => a.population - b.population);
      setcountries(sortedCountry);
      setsortOrder('desc');
    } else if (sortOrder === 'desc') {
      const sortedCountry = countries.sort((a, b) => b.population - a.population);
      setcountries(sortedCountry);
      setsortOrder('asc');
    } else {
      var fetchCountries = JSON.parse(sessionStorage.getItem("countriesCopy"));
      setcountries(fetchCountries)
      setsortOrder('none');
    }
  };

  return (
    <div>
      <div className="country-header">
        <h1>Search for a country</h1>
        <CountriesDropdown handleChange={handleChange} uuid={uuid} dropDownValues={dropDownValues} />
      </div>
      <CountriesList
        headers={headers}
        uuid={uuid}
        sortCountryList={sortCountryList}
        sortOrder={sortOrder}
        countries={countries}
      />
    </div>
  );
}

export default App;
