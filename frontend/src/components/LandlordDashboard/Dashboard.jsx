import React from "react";
import Widget from "../Widgets/Widget";
import Datatable from "../Approval/Approval";
import { widgetData } from "../../utils/dataUtil";
import {selectLandlordData} from "../../stores/landlordSlice.js"
import {useSelector} from "react-redux";

const Landlord_Dashboard = () => {
    const {properties,appointments,totalVacantUnits,totalProperties,totalPendingAppointments} = useSelector(selectLandlordData)
    const data = {
        totalProperties: totalProperties,
        totalPendingAppointments: totalPendingAppointments,
        totalVacantUnits: totalVacantUnits,
    };

    return(
    <div>
        <Widget data={data} layout={'landlord'}/>
        <ul>
      <h1>Appointments</h1>
      <Datatable/>
      
    </ul>
        </div>
    )
}

export default Landlord_Dashboard;