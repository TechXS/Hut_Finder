import React from "react"
import { useSelector } from 'react-redux';
import { selectCurrentClient, selectGetDataError } from '../../stores/clientSlice';
import StickyHeadTable from "../table/ClientAppointments"
import { clientAppointmentsData } from "../../utils/dataUtil";

const All_Appointments = () => {
    // data={Client?.appointments}
    const Client = useSelector(selectCurrentClient);
    console.log('Client\n', Client);
    console.log(Client?.appointments)
    return (
        <div style={{paddingLeft:'80px',paddingRight:'80px'}}>
            <ul>
                <h1 style={{padding:'20px'}}>Appointments</h1>
                <StickyHeadTable data={clientAppointmentsData}/>
    
            </ul>
        </div>
)};

export default All_Appointments
