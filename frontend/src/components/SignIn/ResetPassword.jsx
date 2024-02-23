import React, {useState} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useResetPasswordMutation} from "../../stores/authApi.js";
import {forgotPassValidation} from "../../utils/formValidation.js";
import {setErrorNotification, setSuccessNotification,} from "../../stores/notificationSlice.js";

const ResetPassword = () => {
    const [data, setData] = useState({});
    const navigate = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const [Loading, setLoading] = useState(false);
    const [resetPassword, {data: response, isLoading, error}] =
        useResetPasswordMutation();

    const handleInputChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = await forgotPassValidation(data);
            const responseData = await resetPassword({
                data: {id: searchParams.get("id"), ...formData},
                token: searchParams.get("token"),
            }).unwrap();

            dispatch(setSuccessNotification(responseData.message));

            navigate(`/auth/signin/${searchParams.get("role")}`);
            console.log(responseData);
        } catch (e) {
            console.error(e);
            // console.error(e.data.message)
            dispatch(setErrorNotification(e?.data?.message ?? e.error));
        }
    };

    return (
        <>
            <Typography variant="h5">Reset Password</Typography>

            <Box
                component="form"
                onChange={handleInputChange}
                onClick={handleSubmit}
                noValidate
                sx={{mt: 1}}
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="email"
                    label="Email"
                    type="email"
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="confirm_password"
                    label="Confirm Password"
                    type="password"
                />
                {/* <Button
          fullWidth
          type="submit"
          variant="contained"
          onClick={handleSubmit}
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
                    sx={{mt: 3, mb: 2}}
                >
                    Submit
                </LoadingButton>
            </Box>
        </>
    );
};

export default ResetPassword;
