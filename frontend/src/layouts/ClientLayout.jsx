import React from "react";
import "./landlordLayout.scss"
//import Sidebar from "../components/Sidebar/Landlord_Sidebar";
import NavBar from "../components/NavBar/NavBar";
import { Outlet } from "react-router-dom";


const ClientLayout = () => {
    return(
    <div>
        <NavBar/>
            <div className="dashContainer">
                
               
                <Outlet />
           
        </div>
        </div>
    )
}

export default ClientLayout;