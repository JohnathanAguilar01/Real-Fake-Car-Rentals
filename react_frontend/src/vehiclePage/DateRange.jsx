import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";

const WrappedSingleInputDateRangeField = React.forwardRef((props, ref) => {
  return <SingleInputDateRangeField size="small" {...props} ref={ref} />;
});

WrappedSingleInputDateRangeField.fieldType = "single-input";

function DateRange({ datesChanged }) {
  const [value, setValue] = React.useState([null, null]);

  const changeDate = (newValue) => {
    setValue(newValue);

    // Format the dates to "yyyy-mm-dd"
    const formattedDates = newValue.map((date) =>
      date ? dayjs(date).format("YYYY-MM-DD") : null,
    );

    datesChanged(formattedDates);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["SingleInputDateRangeField"]}>
        <DateRangePicker
          slots={{ field: WrappedSingleInputDateRangeField }}
          onChange={changeDate}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default DateRange;
