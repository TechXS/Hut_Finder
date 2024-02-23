import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCancelPasswordResetMutation } from "../../stores/authApi.js";
import { useEffect } from "react";
import { setErrorNotification } from "../../stores/notificationSlice.js";
import { useDispatch } from "react-redux";

const CancelResetPassword = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [cancelPassword, { data: response, isLoading, error }] =
    useCancelPasswordResetMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch;

  const deletePass = async () => {
    try {
      await cancelPassword(searchParams.get("id"));
    } catch (e) {
      // console.error(e.message);
      dispatch(setErrorNotification(e?.message));
    }
  };

  useEffect(() => {
    deletePass().then();
    return navigate("/");
  }, []);
  return <></>;
};

export default CancelResetPassword;
