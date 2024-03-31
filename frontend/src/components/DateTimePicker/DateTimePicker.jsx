import "./dateTimePicker.css"
import  { useState } from 'react';
import {setAppointmentDate,selectAppointmentDate} from "../../stores/clientSlice.js";
import {useDispatch, useSelector} from "react-redux";


const DateTimePicker = ({value,onChange}) => {
  const [selectedDate, setSelectedDate] = useState(value);
    const dispatch = useDispatch();
    const apointmentDate = useSelector(selectAppointmentDate)

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  //   console.log(selectedDate)
  // };
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      dispatch(setAppointmentDate({ [name]: value }));
      if (name === "date") {
        const newDate = new Date(value);
        setSelectedDate(newDate);
        onChange(newDate); // Notify parent component of the change
      }
      else if (name === "time") {
        const newTime = value.split(":");
        setSelectedDate((prevDate) => {
          const newDateTime = new Date(prevDate);
          newDateTime.setHours(parseInt(newTime[0], 10));
          newDateTime.setMinutes(parseInt(newTime[1], 10));
          return newDateTime;
        });
        onChange(selectedDate); // Notify parent component of the change
      }
      
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
