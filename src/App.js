import React, {useEffect, useState} from 'react';
import { TextField, List, ListItem, ListItemText} from '@material-ui/core';
import './App.css';

function App() {
  const [countries, setCountries] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(false);
  const searchCountries = countries && countries.filter(filterCountry => {
    return filterCountry.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  })
  const isSearchCountriesExist = !!searchCountries?.length;
  const hasNotFound = error || (searchTerm.length >= 3 && !isSearchCountriesExist);
  const borderClass = isSearchCountriesExist || hasNotFound ? 'App-list--border' : '';

  useEffect(() => {
    if (searchTerm && searchTerm.length >= 3) {
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
      if (searchTerm.length) {
        response = await fetch(`https://restcountries.eu/rest/v2/name/${searchTerm}?fields=name`, {
          method: 'GET',
          headers: {
            "Accept": "application/json",
          },
        });
      }

      const countries = await response.json();
      if (countries.status !== 404) {
        setCountries(countries);
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

  return (
    <div className="App">
        <div className="App-search-box">
          <TextField
            label="Countries"
            variant="outlined"
            autoComplete="off"
            value={searchTerm}
            onChange={e => onChangeInputHandler(e.target.value)}
          />
          <List
            className={`App-list ${borderClass}`}
            height={400}
            width={300}
            disablePadding={true}
          >
            {searchCountries && searchCountries.map(country => {
                return (
                  <ListItem button key={`index-${country.name}`}>
                    <ListItemText primary={country.name} />
                  </ListItem>
                )
            })}

            {hasNotFound && (
              <ListItem>
                <ListItemText primary="Not found" />
              </ListItem>
            )}
          </List>
        </div>
    </div>
  );
}

export default App;
