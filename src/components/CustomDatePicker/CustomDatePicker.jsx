import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./datepicker-overrides.css";

const CustomDatePicker = ({
  selectedDate,
  onDateChange,
  placeholder,
  inputClassName,
  ...restProps
}) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={onDateChange}
      dateFormat="yyyy/MM/dd"
      placeholderText={placeholder || "Select a date"}
      className={inputClassName}
      calendarClassName="custom-datepicker-calendar"
      {...restProps}
    />
  );
};

export default CustomDatePicker;
