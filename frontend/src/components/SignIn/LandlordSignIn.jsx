import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import LoadingButton from "@mui/lab/LoadingButton";
import {Link, useNavigate} from "react-router-dom";
import AuthPageSwitcher from "../AuthPageSwitcher/AuthPageSwitcher.jsx";
import {useDispatch, useSelector} from "react-redux";
import {
  loginForm,
  setCurrentLandlord,
  setForgotPassSuccess,
  setLoginError,
  setLoginForm,
} from "../../stores/landlordSlice.js";
import {useState} from "react";
import {signInValidation} from "../../utils/formValidation.js";
import {useSignInLandlordMutation} from "../../stores/authApi.js";
import {setErrorNotification} from "../../stores/notificationSlice.js";

const LandlordSignIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loginData, loginError} = useSelector(loginForm);
    const [Loading, setLoading] = useState(false);
    const [signInLandlord, {data: response, isLoading, error}] =
        useSignInLandlordMutation();

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        dispatch(setLoginForm({[name]: value}));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(setLoginError(null));
        dispatch(setForgotPassSuccess(null));

        try {
            const formData = await signInValidation(loginData);
            const userData = await signInLandlord({data: formData}).unwrap();
            localStorage.setItem("currentLandlord", JSON.stringify(userData));
            dispatch(setCurrentLandlord(userData));
            navigate(`/landlord/dashboard`);
            console.log(userData);
        } catch (e) {
            // console.error(e.data.message);
            // dispatch(setLoginError(e.data.message));
            dispatch(setErrorNotification(e?.data?.message ?? e.error));
        }
    };

    return (
        <>
            <Typography component="h1" variant="h5">
                Hey again Landlord!
            </Typography>
            <br/>
            <AuthPageSwitcher layout="signin"/>

            <Box
                component="form"
                noValidate
                onChange={handleInputChange}
                onSubmit={handleSubmit}
                sx={{mt: 1}}
            >
                <TextField
                    className="input"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    className="input"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary"/>}
                    label="Remember me"
                />
                {/* <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button> */}
                <LoadingButton
                    loading={isLoading}
                    loadingPosition="end"
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    Sign In
                </LoadingButton>

                <Box sx={{mt: 1}}>
                    <Link to="/auth/signin/forgotpassword" variant="body2">
                        Forgot password?
                    </Link>
                </Box>
                <Box sx={{mt: 1}}>
                    {"Don't have an account? "}
                    <Link to="/auth/signup/landlord" variant="body2">
                        Sign Up
                    </Link>
                </Box>
            </Box>
        </>
    );
};

export default LandlordSignIn;
