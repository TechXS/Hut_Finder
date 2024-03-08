import "./landlordLayout.scss"
import Sidebar from "../components/Sidebar/Landlord_Sidebar";
import Navbar from "../components/NavBar/NavBar.jsx";
import { Outlet } from "react-router-dom";
import {Box} from "@mui/material";
import {
    selectCurrentLandlord,
    setLandlordData,
} from "../stores/landlordSlice.js";
import Notification from "../components/Alerts/Notification.jsx";
import { useGetUserDetailsQuery } from "../stores/userApi.js";
import {
    notification,
    setClearNotification,
    setErrorNotification,
    setLoadingNotification,
} from "../stores/notificationSlice.js";
import Loader from "../components/Loader/Loader.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";


const LandlordLayout = () => {
    const dispatch = useDispatch();
    const { _id: landlord_id } = useSelector(selectCurrentLandlord);

    const [showAlert, setShowAlert] = useState(true);
    const [Loading, setLoading] = useState(false);

    const { success, error, isLoading } = useSelector(notification);

    const layoutConfig = {
        landlord: {
            id: landlord_id,
            currentUser: setLandlordData,
        },
    };

    const {
        data: userDetails,
        error: fetchError,
        isError,
        isLoading: detailsLoading,
    } = useGetUserDetailsQuery({
        id: layoutConfig['landlord']["id"],
        layout: 'landlord',
    });
    useEffect(() => {
        if (isError) {
            console.log(fetchError);
            dispatch(
                setErrorNotification(fetchError?.data?.message ?? fetchError.error)
            );
        } else {
            dispatch(setLoadingNotification(detailsLoading));
        }
    }, [detailsLoading, fetchError]);

    useEffect(() => {
        if (userDetails !== undefined) {
            dispatch(layoutConfig['landlord'].currentUser(userDetails));
        }
    }, [userDetails]);

    useEffect(() => {
        if (error || success) {
            console.log(error || success);
            setShowAlert(true);
            setTimeout(() => {
                dispatch(setClearNotification());
            }, 5000);
        }
    }, [error, success]);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setShowAlert(false);
    };


    return(
        <Box sx={{
            display:"flex",
            flexDirection:"column"
        }}>
            <Navbar/>
            <div className="dashboard">
                <Sidebar/>
                <div className="dashContainer">
                    <Outlet/>
                    {success
                        ? Notification({
                            alertType: "success",
                            message: success,
                            showAlert: showAlert,
                            handleClose: handleClose,
                        })
                        : error &&
                        Notification({
                            alertType: "error",
                            message: error,
                            showAlert: showAlert,
                            handleClose: handleClose,
                        })}
                    {<Loader isOpen={isLoading} />}
                </div>
            </div>

        </Box>
    )
}



//
// const PortalLayout = () => {
//     const { layout } = useParams();
//     const dispatch = useDispatch();
//     const { _id: landlord_id } = useSelector(selectCurrentLandlord);
//     const { _id: tenant_id } = useSelector(selectCurrentTenant);
//
//     // const error = useSelector(selectGetDataError);
//     // const success = useSelector(selectGetDataSuccess);
//     const [showAlert, setShowAlert] = useState(true);
//     const [Loading, setLoading] = useState(false);
//
//     const { success, error, isLoading } = useSelector(notification);
//
//     const layoutConfig = {
//         landlord: {
//             id: landlord_id,
//             currentUser: setLandlordData,
//         },
//         tenant: {
//             id: tenant_id,
//             currentUser: setTenantData,
//         },
//     };
//
//     const {
//         data: userDetails,
//         error: fetchError,
//         isError,
//         isLoading: detailsLoading,
//     } = useGetUserDetailsQuery({
//         id: layoutConfig[layout.toLowerCase()]["id"],
//         layout: layout,
//     });
//     useEffect(() => {
//         if (isError) {
//             console.log(fetchError);
//             dispatch(
//                 setErrorNotification(fetchError?.data?.message ?? fetchError.error)
//             );
//         } else {
//             dispatch(setLoadingNotification(detailsLoading));
//         }
//     }, [detailsLoading, fetchError]);
//
//     useEffect(() => {
//         if (userDetails !== undefined) {
//             dispatch(layoutConfig[layout.toLowerCase()].currentUser(userDetails));
//         }
//     }, [userDetails]);
//
//     useEffect(() => {
//         if (error || success) {
//             console.log(error || success);
//             setShowAlert(true);
//             setTimeout(() => {
//                 dispatch(setClearNotification());
//             }, 5000);
//         }
//     }, [error, success]);
//
//     const handleClose = (event, reason) => {
//         if (reason === "clickaway") {
//             return;
//         }
//         setShowAlert(false);
//     };
//
//     return (
//         <Box
//             sx={{
//                 display: "flex",
//             }}
//         >
//             <Sidebar layout={layout} />
//             <Box
//                 sx={{
//                     flex: "6",
//                 }}
//             >
//                 <PortalNavbar layout={layout} />
//                 <Box sx={{ padding: "20px" }}>
//                     <Outlet />
//                 </Box>
//                 {success
//                     ? Notification({
//                         alertType: "success",
//                         message: success,
//                         showAlert: showAlert,
//                         handleClose: handleClose,
//                     })
//                     : error &&
//                     Notification({
//                         alertType: "error",
//                         message: error,
//                         showAlert: showAlert,
//                         handleClose: handleClose,
//                     })}
//                 {<Loader isOpen={isLoading} />}
//             </Box>
//         </Box>
//     );
// };
//
// export default PortalLayout;

export default LandlordLayout;