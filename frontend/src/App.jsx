import {RouterProvider} from "react-router-dom";
import router from "./router/Router";
import {useDispatch} from "react-redux";
import {setCurrentLandlord} from "./stores/landlordSlice";
import {setCurrentClient} from "./stores/clientSlice";
import CssBaseline from "@mui/material/CssBaseline";
import {createTheme, ThemeProvider} from '@mui/material';
import useMediaQuery from "@mui/material/useMediaQuery";
import {useEffect, useMemo, useState} from "react";
import {themePalette} from "./presetsColor.js";



const App = () => {
    const dispatch = useDispatch();
    const currentLandlord = JSON.parse(localStorage.getItem("currentLandlord"));
    const currentClient = JSON.parse(localStorage.getItem("currentClient"));
    if (currentLandlord) {
        dispatch(setCurrentLandlord(currentLandlord));
    } else if (currentClient) {
        dispatch(setCurrentClient(currentClient));
    }
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);


    const theme = useMemo(
        () =>
            createTheme(themePalette[prefersDarkMode ? 'dark' : 'light']),
        [prefersDarkMode],
    );



    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    // setLocation({ latitude, longitude });

                    console.log({ latitude, longitude })

                       sessionStorage.setItem("location",JSON.stringify({ latitude, longitude }))


                    // Send coordinates to the backend
                    // sendCoordinatesToBackend({ latitude, longitude });
                },
                (error) => {
                    setError(`Error: ${error.message}`);
                }
            );
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    };

    const currentLocation = sessionStorage.getItem("location")


    if(!currentLocation){
        console.log("1")
        getLocation()
    }


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <RouterProvider router={router}/>
        </ThemeProvider>);
};

export default App;
