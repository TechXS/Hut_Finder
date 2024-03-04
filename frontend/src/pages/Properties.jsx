import PropertyCard from "../components/Card/PropertyCard.jsx";
import "./pages.scss"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Properties = () => {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: "3rem"
        }}>
            <Typography sx={{
                fontSize: "27px",
                fontWeight: "bold"
            }}>All Your Properties
            </Typography>
            <PropertyCard/>
        </Box>
    );
};

export default Properties;