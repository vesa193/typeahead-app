import React, {useEffect, useState, useRef} from 'react';
import {Button} from '@material-ui/core'; 
import SearchBox from './components/SearchBox/SearchBox';
import './App.css';

function App() {
  const [countries, setCountries] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [submittedCountries, setSubmittedCountries] = useState([]);
  const isSearchCountriesExist = !!countries?.length;
  const hasNotFound = error || (searchTerm.length >= 3 && !isSearchCountriesExist);
  const borderClass = isSearchCountriesExist || hasNotFound ? 'App-list--border' : '';
  let cacheMap = useRef({});

  useEffect(() => {
    if (searchTerm && searchTerm.length >= 3) {
      if (cacheMap.current[searchTerm]) {
        setCountries(cacheMap.current[searchTerm]);
        return;
      }

      getCountries(searchTerm);
      return;
    }

    setCountries(null);
    setError(false);
  }, [searchTerm, error])

  const onChangeInputHandler = val => {
    setSearchTerm(val);
  }

  const getCountries = async (searchTerm) => {
    let response = null;
    try {
      if (searchTerm.length >= 3) {
        response = await fetch(`https://restcountries.eu/rest/v2/name/${searchTerm}?fields=name`, {
          method: 'GET',
          headers: {
            "Accept": "application/json",
          },
        });
      }

      const countries = await response.json();
      if (countries.status !== 404) {
        const filterCountries = countries && countries.filter(filterCountry => { 
          return filterCountry.name.toLowerCase().startsWith(searchTerm.toLowerCase());
        });
        if (!cacheMap.current[searchTerm]) {
          cacheMap.current = {
            ...cacheMap.current,
            [searchTerm]: [
              ...filterCountries,
            ],
          };
        }
        setCountries(filterCountries);
        setError(false);
        return;
      }

      setCountries(null);
      setError(true);
    } catch (error) {
        setCountries(null);
        setError(true);
    }
  };

  const handleSelectItem = (selectedCountry) => {
    const countryIndex = selectedCountries.findIndex(country => country.name === selectedCountry);
    const randomId = new Date().getTime();

    if (!selectedCountry || countryIndex !== -1) return;

    setSelectedCountries([
      ...selectedCountries,
      {id: randomId, name: selectedCountry}
    ]);
  };

  const handleRemoveSelectedCountry = (countryId) => {
    const filterCountries = selectedCountries.filter(country => country.id !== countryId);
    setSelectedCountries(filterCountries);
  };

  const isDisabledListItem = (selectedCountries, countryName) => {
    const index = selectedCountries && selectedCountries.findIndex(country => country.name === countryName);
    const isDisabled = index !== -1;
    return isDisabled;
  };

  const handleSubmit = () => {
    if (selectedCountries.length) {
      const submittedCountries = [...selectedCountries];
      setSubmittedCountries(submittedCountries);
      setSelectedCountries([]);
      setSearchTerm('');
    }
  }

  return (
    <div className="app">
        <h1 className="app-title">Typeahead app</h1>
        <SearchBox
          countries={countries}
          selectedCountries={selectedCountries}
          value={searchTerm}
          handleRemoveSelectedCountry={handleRemoveSelectedCountry}
          onChange={onChangeInputHandler}
          borderClass={borderClass}
          handleSelectItem={handleSelectItem}
          isDisabledListItem={isDisabledListItem}
          hasNotFound={hasNotFound}
        />

      <br />
      <br />

      <Button
        color="primary"
        variant="contained"
        onClick={() => handleSubmit()}
        disabled={!selectedCountries.length}
      >
        Submit
      </Button>

      <br />
      <br />

      {submittedCountries.length ? <h3>List of submitted countries</h3> : null}
      
      {submittedCountries && submittedCountries.map((country, idx) => {
        if (idx === submittedCountries.length - 1) {
          return country.name;
        }

        return `${country.name}, `
      })}

    </div>
  );
}

export default App;
