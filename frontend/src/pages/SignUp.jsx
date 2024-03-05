import {Outlet} from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Copyright from "../components/Copyright/Copyright";
import architectureImage from "/images/architecture.jpg";

const SignUp = () => {
    return (
        <Box
            sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                maxWidth: "100vw",
                margin: "auto",
            }}
        >
            <div>
                <Grid container component="main" sx={{width: "70vw"}}>
                    <CssBaseline/>
                    <Grid
                        item
                        xs={12}
                        sm={8}
                        md={6}
                        component={Paper}
                        elevation={6}
                        square
                        sx={{
                            height: "800px",
                            borderTopRightRadius: "0rem",
                            borderBottomRightRadius: "0rem",
                            borderTopLeftRadius: "2rem",
                            borderBottomLeftRadius: "2rem",
                        }}
                    >
                        <Box
                            sx={{
                                my: 8,
                                mx: 10,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Outlet/>
                            <Copyright/>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={6}
                        sx={{
                            backgroundImage: `url(${architectureImage})`,
                            backgroundRepeat: "no-repeat",
                            backgroundColor: (t) =>
                                t.palette.mode === "light"
                                    ? t.palette.grey[50]
                                    : t.palette.grey[900],
                            backgroundSize: "cover",
                            backgroundPosition: "cent/registerer",
                            borderTopRightRadius: "2rem",
                            borderBottomRightRadius: "2rem",
                            borderTopLeftRadius: "0rem",
                            borderBottomLeftRadius: "0rem",
                        }}
                    />
                </Grid>
                {/* {Loading ? <Loader /> : null} */}
            </div>
        </Box>
    );
};

export default SignUp;
