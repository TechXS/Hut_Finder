import React from "react"
import { useSelector } from 'react-redux';
import { selectCurrentClient, selectGetDataError } from '../../stores/clientSlice';
import StickyHeadTable from "../table/ClientAppointments"
//import { clientAppointmentsData } from "../../utils/dataUtil";
import { useGetAppointmentsQuery } from '../../stores/clientApi'; 
import {Box,CircularProgress} from "@mui/material";


const All_Appointments = () => {
    const Client = useSelector(selectCurrentClient);
    console.log(Client)
    // Fetch appointments data using the query hook
    const { data: clientAppointmentsData, error, isLoading } = useGetAppointmentsQuery(Client?._id);
    // Function to format date and time
    const formatDateTime = (dateTimeString) => {
        const dateObj = new Date(dateTimeString);
        const date = dateObj.toISOString().split('T')[0]; // Get date part
        const time = dateObj.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}); // Get time part in AM/PM format
        return { date, time };
    };

    if (isLoading) return  <Box sx={{ display: 'flex',justifyContent:'center' }}>
        <CircularProgress />
        </Box>;
    if (error) return <div>Error: {error.message}</div>;

    // Map appointments data and format date and time
    const formattedAppointmentsData = clientAppointmentsData.map(appointment => {
        const { date, time } = formatDateTime(appointment.date);
        return { ...appointment, date, time };
    });
    console.log(formattedAppointmentsData)
    return (
        <div style={{paddingLeft:'80px',paddingRight:'80px'}}>
            <ul>
                <h1 style={{padding:'20px'}}>Appointments</h1>
                <StickyHeadTable data={formattedAppointmentsData}/>
    
            </ul>
        </div>
)};

export default All_Appointments
