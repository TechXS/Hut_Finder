import "./pages.scss";
import {Link, useParams} from "react-router-dom";
import {Button} from "@mui/material";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectPropertyData, setPropertyData,} from "../stores/landlordSlice";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useGetPropertyQuery} from "../stores/landlordApi.js";
import {notification, setErrorNotification, setLoadingNotification} from "../stores/notificationSlice.js";
import {selectCurrentLandlord} from "../stores/landlordSlice.js"


const Property = () => {
    const dispatch = useDispatch();
    const landlord = useSelector(selectCurrentLandlord)
    const propertyData = useSelector(selectPropertyData);
    const {id, layout} = useParams();
    const [Loading, setLoading] = useState(false);
    const {data: property, isError, isLoading: propertyLoading, error: fetchError} = useGetPropertyQuery({id:landlord._id,property_id:id})
    const {success, error, isLoading} = useSelector(notification);


    const data = {
        users: propertyData?.totalUsers,
        rentCollected: propertyData?.totalRentCollected,
        rentDue: propertyData?.totalRentDue,
        vacantUnits: propertyData?.totalVacantUnits,
    };
    useEffect(() => {
        setLoading(true)
        if (property) {
            dispatch(setPropertyData(property));
        }
        if (isError) {
            console.error(fetchError)
            dispatch(setErrorNotification(fetchError.data.message))
        } else {
            dispatch(setLoadingNotification(propertyLoading));
        }
    }, [property, fetchError, propertyLoading]);

    return (
        <Box>
            <div className="backbutton">
                {" "}
                <Link to="/">
                    <Button variant="contained" color="secondary">
                        Back
                    </Button>
                </Link>
            </div>
            <Typography sx={{
                fontSize: "27px",
                fontWeight: "bold"
            }}>{propertyData?.name}</Typography>
            <Box sx={{
                display: "flex",
                padding: "20px",
                gap: "50px"
            }}>

            </Box>

        </Box>
    );
};

export default Property;