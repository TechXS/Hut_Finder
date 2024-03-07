import { Box } from '@mui/material';
<<<<<<< HEAD
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useSelector} from "react-redux";
import {selectCurrentLandlord} from "../../stores/landlordSlice.js";
=======
import {Link, useNavigate} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AccountMenu from '../Account_Icon/AccountIcon';
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentLandlord,setLandlordLogout} from "../../stores/landlordSlice.js";
import {selectCurrentClient,setClientLogout} from "../../stores/clientSlice.js";
import {useState} from "react";
import {useLogoutMutation} from "../../stores/authApi.js";

>>>>>>> 5ad0b72a42ef3a98be4fd3dfe31987c17146aba9


const NavBar = () => {
    const landlord = useSelector(selectCurrentLandlord);
<<<<<<< HEAD

    console.log(landlord)
=======
    const client = useSelector(selectCurrentClient);
    const dispatch = useDispatch();
    const [open,setOpen] = useState(false)
    const navigate = useNavigate()

    const [logout, {data: response, isLoading}] = useLogoutMutation();

    var user = (client ?? landlord )?? null
    user = {...user,role: user && client ? "client" : landlord ? "landlord" : ""}

    const handleOpen = ()=>{
        console.log(open)
        setOpen(!open)
    }

    const handleLogout = async ()=>{
     try{

         const data = {
             role : client ? "client" : "landlord"
         }
         const appointmentData = await logout({data: data}).unwrap();
         dispatch(setClientLogout())
         dispatch(setLandlordLogout())
         navigate('/')

     }catch (e) {
         console.error(e.message)
     }
    }

    console.log(user)
>>>>>>> 5ad0b72a42ef3a98be4fd3dfe31987c17146aba9
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
                }} > HUT </Typography>
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
<<<<<<< HEAD
                width: landlord.name ? "10%" : {
=======
                width: user.name ? "10%" : {
>>>>>>> 5ad0b72a42ef3a98be4fd3dfe31987c17146aba9
                    sm:"70%",
                    md:"50%",
                    lg:"40%",
                    xl:"35%"
                }
            }}
        >
<<<<<<< HEAD
            {landlord.name ? (
                    <img src={landlord.imageUrl} alt={"Profile"} style={{
                        fontSize: "20px",
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        cursor: "pointer"
                    }} />
=======
            {user.name ? (
                <>
                    <AccountMenu user={user}/>
                    {/*<img onClick={()=> handleOpen()} src={user.imageUrl} alt={"Profile"} style={{*/}
                    {/*    fontSize: "20px",*/}
                    {/*    width: "60px",*/}
                    {/*    height: "60px",*/}
                    {/*    borderRadius: "50%",*/}
                    {/*    cursor: "pointer"*/}
                    {/*}} />*/}
                    {/*{open && (                    <Box sx={{*/}
                    {/*    position:"absolute",*/}
                    {/*    paddingX:"2rem",*/}
                    {/*    paddingY:"1rem",*/}
                    {/*    top:"2.5rem",*/}


                    {/*}}>*/}
                    {/*        <Button*/}
                    {/*            onClick={()=> handleLogout()}*/}
                    {/*            sx={{*/}
                    {/*                backgroundColor: '#d2d0d0',*/}
                    {/*                "&:hover": { backgroundColor: "#afb0b0" },*/}
                    {/*                textTransform:"none",*/}
                    {/*                color:"black"*/}
                    {/*            }}*/}
                    {/*            disableElevation={true}*/}
                    {/*            disableFocusRipple={true}*/}
                    {/*            variant='contained'*/}
                    {/*        >*/}
                    {/*            Logout*/}
                    {/*        </Button>*/}
                    {/*</Box>)}*/}
                    </>

>>>>>>> 5ad0b72a42ef3a98be4fd3dfe31987c17146aba9
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
<<<<<<< HEAD
                    </Link>
=======

                    </Link>

>>>>>>> 5ad0b72a42ef3a98be4fd3dfe31987c17146aba9
                </>
            )}

        </Box>
      </Box>
  )
}

<<<<<<< HEAD
export default NavBar
=======
export default NavBar
>>>>>>> 5ad0b72a42ef3a98be4fd3dfe31987c17146aba9
