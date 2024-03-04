import "./dateTimePicker.css"
import  { useState } from 'react';

const DateTimePicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="datetime-picker">
      <label htmlFor="date-input">Select Date:</label>
      <input
        id="date-input"
        type="date"
        value={selectedDate.toISOString().slice(0, 10)}
        onChange={(e) => {
          const newDate = new Date(e.target.value);
          const newDateTime = new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate(),
            newDate.getHours(),
            newDate.getMinutes()
          );
          handleDateChange(newDateTime);
        }}
      />
      <label htmlFor="time-input">Select Time:</label>
      <input
        id="time-input"
        type="time"
        value={selectedDate.toTimeString().slice(0, 5)}
        onChange={(e) => {
          const newTime = e.target.value.split(':');
          const newDateTime = new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate(),
            parseInt(newTime[0], 10),
            parseInt(newTime[1], 10)
          );
          handleDateChange(newDateTime);
        }}
      />
    </div>
  );
};

export default DateTimePicker;
