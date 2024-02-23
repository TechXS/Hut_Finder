import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import AuthPageSwitcher from "../AuthPageSwitcher/AuthPageSwitcher";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setForgotPassSuccess,
  setSignupError,
  setSignupForm,
  signupForm,
} from "../../stores/landlordSlice";
import { useSignUpLandlordMutation } from "../../stores/authApi.js";
import { signUpValidation } from "../../utils/formValidation.js";
import { setErrorNotification } from "../../stores/notificationSlice.js";

const LandlordSignUp = () => {
  const dispatch = useDispatch();
  const { signupData } = useSelector(signupForm);
  const navigate = useNavigate();
  const [signupLandlord, { data: response, isLoading, error }] =
    useSignUpLandlordMutation();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    dispatch(setSignupForm({ [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(setSignupError(null));
    dispatch(setForgotPassSuccess(null));
    try {
      const formData = await signUpValidation(signupData);
      const userData = await signupLandlord({ data: formData }).unwrap();
      navigate("/auth/signin/landlord");
      console.log(userData);
    } catch (e) {
      console.error(e);

      // console.error(e.data.message);
      dispatch(setErrorNotification(e?.data?.message ?? e.error));
    }
  };
  // const handleSubmit = (event) => {
  //     event.preventDefault();
  //     setLoading(true);
  //
  //     landlordSignupValidation(signupData)
  //         .then(() => {
  //             fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/landlord/`, {
  //                 method: "POST",
  //                 headers: {
  //                     "Content-Type": "application/json",
  //                 },
  //                 credentials: "include",
  //                 body: JSON.stringify({data: signupData}),
  //             })
  //                 .then(async (response) => {
  //                     setLoading(false);
  //                     if (response.status !== 200) {
  //                         const data = await response.json();
  //                         throw new Error(data.message);
  //                     }
  //                     return response.json();
  //                 })
  //                 .then(() => {
  //                     dispatch(setSignupError(null));
  //                     setLoading(false);
  //                     return navigate("/login");
  //                 })
  //                 .catch((error) => {
  //                     setLoading(false);
  //                     dispatch(setSignupError(error.message));
  //                 });
  //         })
  //         .catch((error) => {
  //             setLoading(false);
  //             dispatch(setSignupError(error.message));
  //         });
  // };
  return (
    <>
      <Typography component="h1" variant="h5">
        Welcome New Landlord!
      </Typography>
      <br />
      <AuthPageSwitcher layout="signup" />

      <Box
        component="form"
        onSubmit={handleSubmit}
        onChange={handleInputChange}
        sx={{ mt: 1, marginTop: "25px" }}
      >
        <Grid
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "10px",
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
            sx={{ paddingRight: "5%" }}
          />
          <TextField
            className="input"
            margin="normal"
            required
            fullWidth
            name="phoneNumber"
            label="Phone Number"
            type="text"
          />
        </Grid>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <TextField
            className="input"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            sx={{ paddingRight: "5%" }}
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
          />
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
          sx={{ marginBottom: "35px" }}
        />

        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
          sx={{ marginBottom: "10px" }}
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
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </LoadingButton>

        <Box>
          Already have an account?{" "}
          <Link to="/auth/signin/landlord" variant="body2">
            Sign In
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default LandlordSignUp;
