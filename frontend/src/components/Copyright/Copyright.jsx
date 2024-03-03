import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";

const Copyright = (props) => {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit"  style={{color:"inherit"}} to="/">
                Hut Finder
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
};

export default Copyright;
