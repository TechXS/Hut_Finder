import "./Footer.css"
import FooterSVG from "./FooterSVG.jsx";
import {Box} from "@mui/material";
import wave from '/images/wave.svg'

const Footer = ()=>{
    return (
        <Box
            sx={{
                    backgroundImage: `url(${wave})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: "none"
                }}
        >
        </Box>
    )
}

export default Footer