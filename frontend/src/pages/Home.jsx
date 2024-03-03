import NavBar from "../components/NavBar/NavBar";
import HeroSection from "../components/HeroSection/HeroSection";
import {Box} from "@mui/material";
import Footer from "../components/Footer/Footer.jsx";
const Home = () => {
    return (
        <Box sx={{
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",
            gap:"2rem",
            width:"100%"
        }}>
        <Box sx={{
            minHeight:"100vh",width:"100%",    display:"flex",
            flexDirection:"column", gap:"2rem",
        }}>
            <NavBar />
            <HeroSection />
        </Box>
            <Footer/>
        </Box>
    );
}

export default Home;
