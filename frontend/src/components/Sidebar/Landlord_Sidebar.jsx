import "./sidebar.scss"
//import DashboardIcon from '@mui/icons-material/Dashboard';
//import OtherHousesIcon from '@mui/icons-material/OtherHouses';
//import QueryStatsIcon from '@mui/icons-material/QueryStats';
//import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
//import SettingsSuggestSharpIcon from '@mui/icons-material/SettingsSuggestSharp';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";


const Sidebar = () => {
    return(
        <div className="sidebar">
            <div className="top">
                <span className="logo">Landlord</span>
            </div>
            <hr/>
            <div className="center">
                <ul>
                    <p className="title">MAIN</p>
                    <li>
                        {/*<DashboardIcon className="icon"/>*/}
                       <Link to="/landlord">
                       <span>Dashboard</span>
                       </Link> 
                    </li>
                    <Link to="/landlord/properties">
                    <li>
                        {/*<OtherHousesIcon className="icon"/>*/}
                        
                        <span>Properties</span>
                        
                    </li>
                    </Link>
                    <li>
                        {/*<QueryStatsIcon className="icon"/>*/}
                        <span>Stats</span>
                    </li>
                    <p className="title">USER</p>
                    <Link to='/landlord/profile'>
                    <li>
                        {/*<AccountBoxRoundedIcon className="icon"/>*/}
                        <span>Profile</span>
                    </li>
                    </Link>
                    <li>
                        {/*<SettingsSuggestSharpIcon className="icon"/>*/}
                        <span>Settings</span>
                    </li>
                    <Link to='/'>
                    <li>
                        <ExitToAppOutlinedIcon className="icon"/>
                        <span>Logout</span>
                    </li>
                    </Link>
                </ul>
            </div>
            <div className="bottom">
                <div className="colorOptions"></div>
                <div className="colorOptions"></div>
                <div className="colorOptions"></div>
            </div>
            {/* <div><Outlet /></div> */}
            
        </div>
    )
}

export default Sidebar;