import "./dateTimePicker.css"
import  { useState } from 'react';
import {setAppointmentDate} from "../../stores/clientSlice.js";
import {useDispatch} from "react-redux";

const DateTimePicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
    const dispatch = useDispatch();

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(selectedDate)
  };
    const handleInputChange = (event) => {
        let {name, value} = event.target;
        dispatch(setAppointmentDate({[name]: value}));
    };



  return (
    <div className="datetime-picker">
      <label htmlFor="date-input">Select Date:</label>
      <input
        id="date-input"
        type="date"
        name={"date"}
        value={selectedDate.toISOString().slice(0, 10)}
        onChange={handleInputChange}
      />
      <label htmlFor="time-input">Select Time:</label>
      <input
        id="time-input"
        type="time"
        name={"time"}
        value={selectedDate.toTimeString().slice(0, 5)}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default DateTimePicker;
