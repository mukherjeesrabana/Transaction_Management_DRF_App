import * as React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import PropTypes from "prop-types";

const currentYear = dayjs();

const MonthYearSelector = ({ onChange }) => {
  const handleChange = (date) => {
    const year = date.year();
    const month = date.month() + 1; // month() returns 0-indexed month
    onChange(year, month);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Select month and year"
        maxDate={currentYear}
        openTo="year"
        views={["year", "month"]}
        onChange={handleChange}
        defaultValue={dayjs()}
        sx={{ minWidth: 250 }}
      />
    </LocalizationProvider>
  );
};

MonthYearSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default MonthYearSelector;
