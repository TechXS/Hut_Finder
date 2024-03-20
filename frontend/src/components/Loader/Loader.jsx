import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = ({isOpen=false}) => {
    return (
        <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isOpen}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default Loader;