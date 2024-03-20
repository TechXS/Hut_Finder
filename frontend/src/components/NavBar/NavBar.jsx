import { Box } from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AccountMenu from '../Account_Icon/AccountIcon';
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentLandlord,setLandlordLogout} from "../../stores/landlordSlice.js";
import {selectCurrentClient,setClientLogout} from "../../stores/clientSlice.js";
import {useState} from "react";
import {useLogoutMutation} from "../../stores/authApi.js";



const NavBar = () => {
    const landlord = useSelector(selectCurrentLandlord);
    const client = useSelector(selectCurrentClient);
    const dispatch = useDispatch();
    const [open,setOpen] = useState(false)
    const navigate = useNavigate()

    const [logout, {data: response, isLoading}] = useLogoutMutation();

    var user = client.role ==="client" ? client : landlord.role === "landlord" ? landlord : null

    const navLinks = [
        {
            name:"Home",
            path:"/"
        },
        {
            name:"Browse",
            path:"/browse"
        },
        {
            name:"Contact Us",
            path:"/#contact_us"
        }
    ]
  return (
        <Box
            sx={{
                background:"white",
                display: "flex",
                width: "100%",
                height: "4rem",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "1.2rem",
                position: "sticky",
                top: " 0",
                zIndex: "999",
                paddingY:"0.5rem",
                paddingX:"2rem",
                boxShadow:"  0 1px 2px 0 rgb(0 0 0 / 0.05)"
            }}
      >
        <Box  sx={{
            color: "#ffffff",
            cursor: "pointer",
            textDecoration: "none",
            fontSize: "1.5rem"
        }}>
            <Link to={'/'}>
                <Typography variant={'span'} sx={{
                    color:"#000000",
                    fontSize:"25px"
                }} > HuYyT </Typography>
                <Typography variant={'span'} sx={{
                color:"#07779A",
                    fontSize:"25px"
            }}> FINDER </Typography>
            </Link>
        </Box>
        <Box
            sx={{
                display: "flex",
                alignItems:'center',
                justifyContent:'space-around',
                position:"relative",
                width: user ? "10%" : {
                    sm:"70%",
                    md:"50%",
                    lg:"40%",
                    xl:"35%"
                }
            }}
        >
            {user ? (
                    <AccountMenu user={user}/>

            ) : (
                <>
                    {navLinks.map((navLink, id) => (
                        navLink.name === "Contact Us" ? (
                            <a href={navLink.path} key={id}>
                                <Box
                                    sx={{
                                        color: "#07779A",
                                        "&:hover": { backgroundColor: "#bde1ea" },
                                        fontSize: "20px",
                                        fontWeight: "semibold",
                                        borderRadius: 2,
                                        paddingY: "0.5rem",
                                        paddingX: "1rem",
                                        minWidth: "6rem",
                                        display: {
                                            xs: "none",
                                            sm: "flex"
                                        }
                                    }}
                                >
                                    {navLink.name}
                                </Box>
                            </a>
                        ) : (
                            <Link to={navLink.path} key={id}>
                                <Box
                                    sx={{
                                        color: "#07779A",
                                        "&:hover": { backgroundColor: "#bde1ea" },
                                        fontSize: "20px",
                                        fontWeight: "semibold",
                                        borderRadius: 2,
                                        paddingY: "0.5rem",
                                        paddingX: "1rem",
                                        minWidth: "6rem",
                                        display: {
                                            xs: "none",
                                            sm: "flex"
                                        }
                                    }}
                                >
                                    {navLink.name}
                                </Box>
                            </Link>
                        )
                    ))}
                    <Link to="/auth/signin/client">
                        <Button
                            sx={{
                                backgroundColor: '#07779a',
                                "&:hover": { backgroundColor: "#0f586b" },
                            }}
                            disableElevation={true}
                            disableFocusRipple={true}
                            variant='contained'
                        >
                            LOGIN
                        </Button>

                    </Link>

                </>
            )}

        </Box>
      </Box>
  )
}

export default NavBar
