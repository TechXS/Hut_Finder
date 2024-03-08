import PropertyCard from "../components/Card/PropertyCard.jsx";
import "./pages.scss"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AddIcon from '@mui/icons-material/Add';
import { propertyData } from "../utils/dataUtil.js";
import OutlinedCard from "../components/Card/OutlinedCard.jsx";

const AddCard = () => {
    return (
        <>
                    <div>
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
            <PropertyCard data={propertyData}/>
            {/*<OutlinedCard data={propertyData}/>*/}
            
        </Box>
        </div>
        </>
    );
};

export default AddCard;