import React, { useState } from "react";
import "./SearchBar.css";
import DateRangePicker from "rsuite/DateRangePicker";
import "rsuite/dist/rsuite.min.css";
import "rsuite/DateRangePicker/styles/index.css";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

function SearchBar({ onSearch, onClick }) {
  const options = ["Sedan", "SUV", "Truck", "Coupe"];
  const [foo, setFoo] = useState("");

  const handleDateChange = (value) => {
    if (value) {
      const [startDate, endDate] = value;
      // Call onSearch with the selected dates
      onSearch(
        startDate?.toISOString().split("T")[0],
        endDate?.toISOString().split("T")[0],
        foo,
      );
    } else {
      // Reset search if no dates are selected
      onSearch(null, null, foo);
    }
  };

  const onTypeChange = (event, newValue) => {
    setFoo(newValue);
  };

  return (
    <div className="SearchBar">
      <DateRangePicker
        size="lg"
        appearance="default"
        placeholder="Reservation Date Range"
        style={{ width: 400 }}
        className="SearchBar-daterangepicker"
        onChange={handleDateChange}
      />
      <Autocomplete
        className="SearchBar-type"
        size="small"
        options={options}
        renderInput={(params) => (
          <TextField {...params} placeholder="Car Types" />
        )}
        sx={{ width: 200 }}
        onChange={onTypeChange}
      />
      <button className="SearchBar-button" onClick={onClick}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
