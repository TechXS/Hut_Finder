import {Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  loginForm as landlordLoginForm,
  selectForgotPassSuccess as landlordForgotPassSuccess,
  signupForm as landlordSignUpForm
} from "../stores/landlordSlice";
import {
  loginForm as clientLoginForm,
  selectForgotPassSuccess as clientForgotPassSuccess,
  signupForm as clientSignUpForm
} from "../stores/clientSlice";
import {notification, setClearNotification,} from "../stores/notificationSlice";
import Notification from "../components/Alerts/Notification";

const AuthLayout = () => {
    const {signupError: landlordSignUpError} = useSelector(landlordSignUpForm);
    const {signupError: clientSignUpError} = useSelector(clientSignUpForm);
    const {loginError: landlordLoginError} = useSelector(landlordLoginForm);
    const {loginError: clientLoginError} = useSelector(clientLoginForm);
    const landlordSuccess = useSelector(landlordForgotPassSuccess);
    const clientSuccess = useSelector(clientForgotPassSuccess);
    const {success, error} = useSelector(notification);
    const [showAlert, setShowAlert] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        if (success || error) {
            setShowAlert(true);
            setTimeout(() => {
                dispatch(setClearNotification());
            }, 5000);
        }
    }, [success, error]);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setShowAlert(false);
    };

    return (
        <div>
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
        </div>
    );
};

export default AuthLayout;
