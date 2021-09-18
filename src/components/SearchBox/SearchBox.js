import React from 'react';
import SearchBoxList from '../SearchBoxList/SearchBoxList';
import SearchBoxPills from '../SearchBoxPills/SearchBoxPills';
import SearchBoxInput from '../SearchBoxInput/SearchBoxInput';
import './SearchBox.css';

function SearchBox(props) {
    const {
        countries,
        selectedCountries,
        handleRemoveSelectedCountry,
        value,
        onChange,
        borderClass,
        handleSelectItem,
        isDisabledListItem,
        hasNotFound
    } = props;

    return (
        <div className="search-box">
            <div className="search-box--inner">
                <SearchBoxPills
                    selectedCountries={selectedCountries}
                    handleRemoveSelectedCountry={handleRemoveSelectedCountry}
                />
                <SearchBoxInput
                    value={value}
                    onChange={e => onChange(e.target.value)}
                />
            </div>
            <SearchBoxList
                countries={countries}
                selectedCountries={selectedCountries}
                borderClass={borderClass}
                handleSelectItem={handleSelectItem}
                isDisabledListItem={isDisabledListItem}
                hasNotFound={hasNotFound}
            />
        </div>
    );
}

export default SearchBox;
