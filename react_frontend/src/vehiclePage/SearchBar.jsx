import React, { useState } from "react";
import "./SearchBar.css";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import DateRange from "./DateRange.jsx";

function SearchBar({ onSearch }) {
  const options = ["Sedan", "SUV", "Truck", "Coupe"];
  const [foo, setFoo] = useState("");
  const [bar, setBar] = useState([null, null]);

  const handleDateChange = (value) => {
    if (value) {
      setBar(value);
      // Call onSearch with the selected dates
    }
    console.log("Formatted Dates:", value);
  };

  const onTypeChange = (event, newValue) => {
    setFoo(newValue);
  };

  const onSearchClick = (dates, type) => {
    onSearch(bar[0], bar[1], foo);
  };

  return (
    <div className="SearchBar">
      <div className="SearchBar-daterange">
        <DateRange datesChanged={handleDateChange} />
      </div>
      <div className="SearchBar-type">
        <Autocomplete
          size="small"
          options={options}
          renderInput={(params) => (
            <TextField {...params} placeholder="Car Types" />
          )}
          sx={{ width: 200 }}
          onChange={onTypeChange}
        />
      </div>
      <button className="SearchBar-button" onClick={onSearchClick}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
