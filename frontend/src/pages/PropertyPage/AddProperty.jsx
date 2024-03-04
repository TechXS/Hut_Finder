//import "../../layouts/landlordLayout.scss"
import React from 'react';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import AddIcon from '@mui/icons-material/Add';
import OutlinedCard from "../../components/Cards/OutlinedCard";
import { Link } from "react-router-dom";
import { propertyData } from "../../utils/dataUtil";

import './properties.scss'
//import CustomizedSnackbars from "../../components/Alerts/SnackBar";

const Property = () => {
    return(
        <div className="dashboard">
            
            <div className="dashContainer">
                
                
                <div className="tableData">
                    <>
                    <ul>
                    
                    <h4>Add Property</h4>
                    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                   
                    <AddIcon className='addbutton'  
                    style={{ fontSize: '7rem'  ,display:'flex', justifyContent:'space-evenly'}}/>
                    
                    <Link to="/landlord/properties" component="span"
                    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
                    <div className="widgets">
                    <OutlinedCard data={propertyData}/>
                     </div>
                     </Link>
                    
                </div>
                    </ul>
                    
                    </>
                    
                </div>
            </div>
        </div>
    )
}

export default Property;