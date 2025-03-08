import React, { useState } from "react";
import "./SearchBar.css";
import { Autocomplete } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import dayjs from "dayjs";

function SearchBar({ onSearch }) {
  const options = ["Sedan", "SUV", "Truck", "Coupe"];
  const [foo, setFoo] = useState("");
  const [bar, setBar] = useState([null, null]);

  const formattedStartDate = bar[0] ? dayjs(bar[0]).format("YYYY-MM-DD") : "";
  const formattedEndDate = bar[1] ? dayjs(bar[1]).format("YYYY-MM-DD") : "";

  const onTypeChange = (event, newValue) => {
    setFoo(newValue);
  };

  const onSearchClick = (dates, type) => {
    onSearch(formattedStartDate, formattedEndDate, foo);
  };

  //const changeDate = (newValue) => {
  //  setValue(newValue);

  //  // Format the dates to "yyyy-mm-dd"
  //  const formattedDates = newValue.map((date) =>
  //    date ? dayjs(date).format("YYYY-MM-DD") : null,
  //  );

  //  datesChanged(formattedDates);
  //};

  return (
    <div className="SearchBar">
      <DatePickerInput
        type="range"
        placeholder="Pick Rental Dates"
        value={bar}
        size="md"
        onChange={setBar}
        w={300}
      />
      <div className="SearchBar-type">
        <Autocomplete
          placeholder="Car Types"
          data={options}
          value={foo}
          onChange={setFoo}
          size="md"
          pos="relative"
        />
      </div>
      <button className="SearchBar-button" onClick={onSearchClick}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
