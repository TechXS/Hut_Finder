import React from "react"
import StickyHeadTable from "../table/ClientAppointments"
import { clientAppointmentsData } from "../../utils/dataUtil";

const All_Appointments = () => {
    return (
        <div style={{paddingLeft:'80px',paddingRight:'80px'}}>
            <ul>
                <h1 style={{padding:'20px'}}>Appointments</h1>
                <StickyHeadTable data={clientAppointmentsData}/>
    
            </ul>
        </div>
)};

export default All_Appointments
