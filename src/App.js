import React, { useEffect, useState } from 'react';
import CountriesDropdown from './components/CountriesDropdown'
import CountriesList from './components/CountriesList';
import CountriesSearchBox from './components/CountriesSearchBox';
import './App.css';

function App() {
  const [countries, setcountries] = useState([]);
  const [dropDownValues, setdropDownValues] = useState([])
  const [headers, setheaders] = useState([])
  const [sortOrder, setsortOrder] = useState('desc')

  const uuid = (function uuid() {
    var i = 0;
    return function inner() {
      return ++i;
    }
  })()

  const fetchCountryList = () => {
    fetch(
      'https://restcountries.eu/rest/v2/all?fields=name;capital;languages;currencies;region;subregion;population;area'
    )
      .then(res => res.json())
      .then(res => {
        res.forEach(item => {
          if (!item.area) {
            item.area = 0;
          }
        });
        sessionStorage.setItem('countriesCopy', JSON.stringify(res));
        setdropDownValues(res);
        setcountries(res.sort((a, b) => a.population - b.population));
      });
  };

  useEffect(() => {
    fetchCountryList();
  }, []);

  useEffect(() => {
    const fetchCountries = JSON.parse(sessionStorage.getItem('countriesCopy'));
    if(fetchCountries && fetchCountries.length > 0){
      const keyList = Object.keys(fetchCountries[0]);
      setheaders(keyList);
    }
  }, [countries]);

  const handleChange = e => {
    if (e.target.value === '--Select Country--') {
      const fetchCountries = JSON.parse(sessionStorage.getItem("countriesCopy"));
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
      const fetchCountries = JSON.parse(sessionStorage.getItem("countriesCopy"));
      setcountries(fetchCountries)
      setsortOrder('none');
    }
  };

  const searchByNameorCode = e => {
    const fetchCountries = JSON.parse(sessionStorage.getItem('countriesCopy'));
    if (!e.target.value) {
      setcountries(fetchCountries);
    } else {
      const searchName = e.target.value.toLowerCase();
      setcountries(fetchCountries.filter(country => country.name.toLowerCase().indexOf(searchName) !== -1));
    }
  };

  return (
    <div>
      <div className="country-header">
        <h1>Search for a country</h1>
        <CountriesDropdown handleChange={handleChange} uuid={uuid} dropDownValues={dropDownValues} />
        <CountriesSearchBox searchByNameorCode={searchByNameorCode} />
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
