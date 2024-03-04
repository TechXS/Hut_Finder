import {Box, Typography} from "@mui/material";
import wave from '/images/wave.svg'
import TextField from "@mui/material/TextField";
import React from "react";
import Button from "@mui/material/Button";
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import Copyright from "../Copyright/Copyright.jsx"
import { Link } from 'react-router-dom';

const Footer = ()=>{
    const contacts = [
        {
            name:"Gmail",
            icon:EmailIcon,
            link:"mailto:techxweb@gmail.com"
        },
        {
            name:"Telephone",
            icon:LocalPhoneIcon,
            link:""
        },
        {
            name:"Instagram",
            icon:InstagramIcon,
            link:"https://www.instagram.com/"
        },
        {
            name:"X",
            icon:XIcon,
            link:"https://twitter.com/"
        },
        {
            name:"Facebook",
            icon:FacebookIcon,
            link:"https://www.facebook.com/"
        }
    ]
    return (
        <Box component={"div"} id="contact_us" sx={{
            backgroundImage: `url(${wave})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width:"100%",
            minHeight:{
                xs:"50rem",
                md:"30rem"
            },
            display:"flex",
            alignItems:"end",
        }}>
        <Box
            sx={{
                display:"flex",
                flex:"1 1 0",
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"space-around",
                position:"relative",
                color:"white",
                paddingX:"3rem",
                paddingY:"1rem",
                height:"100%",
                width:"100%",
                flexWrap:"wrap",
                gap:"2rem",
            }}
        >
            <Box
                sx={{
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"start",
                    justifyContent:"space-around",
                    position:"relative",
                    gap:"1rem"
                }}
            >
                <Typography variant="h1" sx={{ //#A3D9D9
                    fontSize:"25px",
                    fontWeight:"bold"
                }}>
                    Subscribe our Newsletters
                </Typography>
                <Typography variant="p" sx={{ //#A3D9D9
                    fontSize:"16px",
                    fontWeight:"normal"
                }}>
                    Join our newsletter to stay up to date on features and releases
                </Typography>

          <Box      sx={{
              display:"flex",
              flexDirection:"row",
              alignItems:"center",
              justifyContent:"space-between",
              position:"relative",
              gap:"2rem",
              flex:"1 1 0",
              flexWrap:"wrap"
          }}>
              <TextField
                  margin="normal"
                  label='Email Address'
                  name="email"
                  type="text"
                  sx={{width:{
                      xs:"20rem", md:"25rem"
                      },
                          backgroundColor:"#FFFFFF",
                      borderRadius:2
                  }}
              />
              <Button sx={{backgroundColor:'#d74e28' , paddingX:"2rem",paddingY:"0.5rem",textTransform:"none"
                  ,fontSize:"17px",
                  "&:hover":{backgroundColor:"#93321a"},}}
                      variant='contained'
                      disableElevation={true}
                      disableFocusRipple={true}
              >Subscribe</Button>
          </Box>
                <Copyright color={'white'} fontSize={'16px'}/>
            </Box>
            <Box
            sx={{
                display:"flex",
                flexDirection:"column",
                alignItems:"start",
                justifyContent:"space-around",
                position:"relative",
                height:"100%"
            }}>
                <Typography sx={{
                    fontSize:"25px",
                    fontWeight:"bold"
                }}
                >Contact Us</Typography>
                {
                    contacts.map((contact,index)=>(
                        <Link to={contact.link} key={index} style={{color:"#ffffff"}}>
                            <Box sx={{
                                display:"flex",
                                flexDirection:"row",
                                justifyContent:"space-between",
                                alignItems:"center",
                                width:"100%",
                                position:"relative",
                                gap:"1.5rem",
                                flex:"1 1 0",
                                flexWrap:"wrap"
                            }}>
                                <contact.icon fontSize="medium"/>
                                {contact.name}
                            </Box>
                        </Link>
                    ))
                }
            </Box>
        </Box>
        </Box>
    )
}

export default Footer