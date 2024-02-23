import {RouterProvider} from "react-router-dom";
import router from "./router/Router";
import {useDispatch} from "react-redux";
import {setCurrentLandlord} from "./stores/landlordSlice";
import {setCurrentClient} from "./stores/clientSlice";
import CssBaseline from "@mui/material/CssBaseline";
import {createTheme, ThemeProvider} from '@mui/material';
import useMediaQuery from "@mui/material/useMediaQuery";
import {useMemo} from "react";
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

    const theme = useMemo(
        () =>
            createTheme(themePalette[prefersDarkMode ? 'dark' : 'light']),
        [prefersDarkMode],
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <RouterProvider router={router}/>
        </ThemeProvider>);
};

export default App;
