import React from 'react';
import {List, ListItem, ListItemText} from '@material-ui/core';
import './SearchBoxList.css';

function SearchBoxList(props) {
    const {
        countries,
        selectedCountries,
        borderClass,
        handleSelectItem,
        isDisabledListItem,
        hasNotFound
    } = props;

    return (
        <List
            className={`search-box-list ${borderClass}`}
            height={400}
            width={300}
            disablePadding={true}
        >
            {countries && countries.map(country => {
                return (
                <ListItem
                    key={`index-${country.name}`}
                    button
                    onClick={() => handleSelectItem(country.name)}
                    disabled={isDisabledListItem(selectedCountries, country.name)}
                >
                    <ListItemText
                        className={isDisabledListItem(selectedCountries, country.name) ? 'search-box-item--disabled' : ''}
                        primary={country.name}
                    />
                </ListItem>
                )
            })}

            {hasNotFound && (
                <ListItem>
                    <ListItemText primary="Not found" />
                </ListItem>
            )}
        </List>
    );
}

export default SearchBoxList;
