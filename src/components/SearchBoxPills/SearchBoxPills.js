import React from 'react';
import Chip from '@mui/material/Chip';
import './SearchBoxPills.css';

function SearchBoxPills({selectedCountries, handleRemoveSelectedCountry}) {
    return (
        <div className={`search-box-pills ${selectedCountries.length ? 'search-box-pills--padding' : ''}`}>
            {selectedCountries && selectedCountries.map(selectedCountry => {
                return (
                    <Chip
                        className="search-box-pill"
                        key={`index-${selectedCountry.id}`}
                        label={selectedCountry.name}
                        variant="outlined"
                        onDelete={() => handleRemoveSelectedCountry(selectedCountry.id)}
                    />
                )
            })}
        </div>
    );
}

export default SearchBoxPills;
