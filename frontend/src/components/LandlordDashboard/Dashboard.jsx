import React from "react";
import Widget from "../Widgets/Widget";
import Datatable from "../Approval/Approval";
import { widgetData } from "../../utils/dataUtil";



const Landlord_Dashboard = () => {
    return(
    <div>
        <div>
                {
                    widgetData.map((widget)=>{
                        return(
                            <Widget data={widget} key={widget.title}/>
                        )
                            
                    })
                }
            </div>
        <ul>
      <h1>Appointments</h1>
      <Datatable/>
      
    </ul>
        </div>
    )
}

export default Landlord_Dashboard;