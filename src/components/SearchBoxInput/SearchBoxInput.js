import React from 'react';
import {TextField} from '@material-ui/core';

function SearchBoxInput(props) {
    const {
        value,
        onChange,
    } = props;

    return (
        <TextField
            label="Search country"
            variant="outlined"
            autoComplete="off"
            value={value}
            onChange={onChange}
        />
    );
}

export default SearchBoxInput;
