import { useState } from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Notification = ({ alertType, message, showAlert, handleClose }) => {
  return (
    <Stack spacing={2}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={showAlert}
        autoHideDuration={10000}
        onClose={(event) => handleClose(event)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity={alertType}
          sx={{ width: "100%", transform: "translate(-50%, -50%)" }}
        >
          {message}
        </MuiAlert>
      </Snackbar>
    </Stack>
  );
};

export default Notification;
