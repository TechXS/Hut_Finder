import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setForgotPassSuccess,
  setLoginError,
} from "../../stores/landlordSlice";
import { useForgotPasswordMutation } from "../../stores/authApi.js";
import {
  setSuccessNotification,
  setErrorNotification,
} from "../../stores/notificationSlice.js";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(false);
  const [forgotPassword, { data: response, isLoading, error }] =
    useForgotPasswordMutation();

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Assuming you have a 'loginData' state variable to store the form data
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // dispatch(setLoginError(null));
    // dispatch(setForgotPassSuccess(null));

    try {
      const userData = await forgotPassword({ data: formData }).unwrap();
      console.log(userData);
      // dispatch(setForgotPassSuccess(userData.message));
      dispatch(setSuccessNotification(userData.message));
    } catch (e) {
      console.error(e);
      // dispatch(setLoginError(e.data.message));
      dispatch(setErrorNotification(e?.data?.message ?? e.error));
    }
  };

  // const handleSubmit = (event) => {
  //     dispatch(setLoginError(null));
  //     event.preventDefault();
  //     setLoading(true);
  //     fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/landlord/forgotpassword`, {
  //         method: "POST",
  //         headers: {
  //             "Content-Type": "application/json",
  //         },
  //         credentials: "include",
  //         body: JSON.stringify({data: formData}),
  //     })
  //         .then(async (response) => {
  //             setLoading(false)
  //             if (response.status !== 200) {
  //                 const data = await response.json();
  //                 throw new Error(data.message);
  //             }
  //
  //             return response.json();
  //         })
  //         .then((data) => {
  //             dispatch(setForgotPassSuccess(data.message));
  //             setLoading(true);
  //             navigate("/login");
  //         })
  //         .catch((error) => {
  //             dispatch(setLoginError(error.message));
  //             setLoading(true);
  //         });
  // };

  return (
    <>
      <Typography variant="h5">Forgot Password</Typography>

      <Box
        component="form"
        noValidate
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />

        {/* <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </Button> */}
        <LoadingButton
          loading={isLoading}
          loadingPosition="end"
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </LoadingButton>
      </Box>
    </>
  );
};

export default ForgotPassword;
