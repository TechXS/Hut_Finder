import NavBar from "../components/NavBar/NavBar";
import HeroSection from "../components/HeroSection/HeroSection";
import {Box} from "@mui/material";
import Footer from "../components/Footer/Footer.jsx";
const Home = () => {
    return (
        <>
        <Box sx={{
            height:"100vh",width:"100%"
        }}>
            <NavBar />
            <HeroSection />
        </Box>
            <Footer/>
            </>
    );
}

export default Home;
