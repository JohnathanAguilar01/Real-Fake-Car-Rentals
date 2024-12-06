import React, { useState } from "react";
import Select from "react-select";

function TypeComboBox() {
  const options = [
    { value: "option1", label: "Sedan" },
    { value: "option2", label: "SUV" },
    { value: "option3", label: "Truck" },
  ];

  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div>
      <Select
        options={options}
        value={selectedOption}
        onChange={setSelectedOption}
        placeholder="Select an option"
      />
    </div>
  );
}

export default TypeComboBox;
