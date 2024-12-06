import React from "react";
import "./SearchBar.css";
import DateRangePicker from "rsuite/DateRangePicker";
import "rsuite/dist/rsuite.min.css";
import "rsuite/DateRangePicker/styles/index.css";
import CustomComboBox from "./TypeComboBox";

function SearchBar() {
  return (
    <div className="SearchBar">
      <DateRangePicker
        appearance="default"
        placeholder="Reservation Date Range"
        style={{ width: 400 }}
        className="SearchBar-daterangepicker"
      />
      <button className="SearchBar-button">Search</button>
    </div>
  );
}

export default SearchBar;
