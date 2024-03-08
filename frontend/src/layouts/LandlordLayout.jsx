import "./landlordLayout.scss"
import Sidebar from "../components/Sidebar/Landlord_Sidebar";
//import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";


const LandlordLayout = () => {
    return(
        <div className="dashboard">
            <Sidebar/>
            <div className="dashContainer">
                {/*<Navbar/>*/}

                <Outlet />
            </div>
        </div>
    )
}

export default LandlordLayout;