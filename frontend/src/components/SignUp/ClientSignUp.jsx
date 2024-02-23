import {useState} from "react";
import {FormControl, InputLabel, MenuItem, Select,} from "@mui/material";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import AuthPageSwitcher from "../AuthPageSwitcher/AuthPageSwitcher";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setSignupError, setSignupForm, signupForm,} from "../../stores/clientSlice";
import {signUpValidation} from "../../utils/formValidation";
import {setForgotPassSuccess} from "../../stores/landlordSlice.js";
import {useSignUpClientMutation} from "../../stores/authApi.js";
import {useGetPropertiesQuery, useGetUnitsOfPropertyQuery,} from "../../stores/propertyApi.js";
import {setErrorNotification} from "../../stores/notificationSlice.js";

const ClientSignUp = () => {
    const dispatch = useDispatch();
    const {signupData, signupError} = useSelector(signupForm);
    const navigate = useNavigate();
    const [propertyId, setPropertyId] = useState(null);
    const [skip, setSkip] = useState(true);
    const [Loading, setLoading] = useState(false);
    const [signUpClient, {data: response, isLoading}] = useSignUpClientMutation();
    const {data: properties} = useGetPropertiesQuery();
    const {
        data: units,
    } = useGetUnitsOfPropertyQuery(propertyId, {skip});

    const handleInputChange = async (event) => {
        const {name, value} = event.target;
        dispatch(setSignupForm({[name]: value}));

        if (name === "property") {
            setPropertyId(value);
            setSkip(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(setSignupError(null));
        dispatch(setForgotPassSuccess(null));
        try {
            const formData = await signUpValidation(signupData);
            const userData = await signUpClient({data: formData}).unwrap();
            navigate("/auth/signin/client");
            console.log(userData);
        } catch (e) {
            // console.error(e.data.message);
            // dispatch(setSignupError(e.data.message));
            dispatch(setErrorNotification(e?.data?.message ?? e.error));
        }
    };

    return (
        <>
            <Typography component="h1" variant="h5">
                Welcome New Client!
            </Typography>
            <br/>
            <AuthPageSwitcher layout="signup"/>

            <Box
                component="form"
                onSubmit={handleSubmit}
                onChange={handleInputChange}
                sx={{mt: 1}}
            >
                <Grid
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <TextField
                        className="input"
                        margin="normal"
                        required
                        fullWidth
                        label="Your Name"
                        name="name"
                        autoFocus
                        type="text"
                        sx={{width: "50%", marginRight: "2.5%"}}
                    />
                    <TextField
                        className="input"
                        margin="normal"
                        required
                        fullWidth
                        name="phoneNumber"
                        label="Phone Number"
                        type="text"
                        sx={{width: "50%", marginLeft: "2.5%"}}
                    />
                </Grid>
                <Grid
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "16px",
                    }}
                >
                    <TextField
                        className="input"
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        sx={{width: "50%", marginRight: "2.5%"}}
                    />

                    <TextField
                        className="input"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        sx={{width: "50%", marginLeft: "2.5%"}}
                    />
                </Grid>

                <Grid
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "8px",
                    }}
                >
                    <FormControl sx={{width: "50%", marginRight: "2.5%"}}>
                        <InputLabel htmlFor="property" id="propertyform">
                            Select Property
                        </InputLabel>
                        <Select
                            name="property"
                            labelId="propertyform"
                            onChange={handleInputChange}
                            label="Select Property"
                        >
                            {properties &&
                                properties.map((property) => (
                                    <MenuItem key={property._id} value={property._id}>
                                        {property.name}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>

                    <FormControl sx={{width: "50%", marginLeft: "2.5%"}}>
                        <InputLabel htmlFor="unit" id="unitform">
                            Select Unit
                        </InputLabel>
                        <Select
                            name="unit"
                            onChange={handleInputChange}
                            label="Select Unit"
                        >
                            {units &&
                                units.map((unit) => (
                                    <MenuItem key={unit._id} value={unit._id}>
                                        {unit.name}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                </Grid>

                <TextField
                    className="input"
                    margin="normal"
                    required
                    fullWidth
                    name="confirm_password"
                    label="Confirm Password"
                    type="password"
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
          Sign Up
        </Button> */}

                <LoadingButton
                    loading={isLoading}
                    loadingPosition="end"
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    Sign Up
                </LoadingButton>

                <Box>
                    Already have an account?{" "}
                    <Link to="/auth/signin/client" variant="body2">
                        Sign in
                    </Link>
                </Box>
            </Box>
        </>
    );
};

export default ClientSignUp;
