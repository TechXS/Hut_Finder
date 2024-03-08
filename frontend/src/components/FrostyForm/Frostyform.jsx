import React, {useEffect, useState} from 'react'
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import {Box, FormControl, InputAdornment} from '@mui/material';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HomeIcon from '@mui/icons-material/Home';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Frostyform = () => {
    const [address, setAddress] = useState('');
    const [coordinates, setCoordinates] = useState(null);
    const [formData,setFormData] = useState({});
    const [url, setUrl] = useState('/browse');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    useEffect(() => {
        // Generate URL based on form data
        let generatedUrl = '/browse';
        const queryParams = Object.keys(formData).map(key => `${key}=${encodeURIComponent(formData[key])}`).join('&');
        if (queryParams) {
            generatedUrl += `?${queryParams}`;
        }
        setUrl(generatedUrl);
    }, [formData]);

  return (
          <Box
                component="form"
                sx={{
                display:"flex",
                flexDirection:{
                    xs:"column",
                    sm:"row"
                },
                justifyContent:"space-evenly",
                alignItems:"baseline",
                backdropFilter:"blur(7px)",
                border:"solid",
                borderColor:"white",
                borderWidth:"1px",
                borderRadius:"10px",
                flexWrap:"wrap",
                    padding:"1rem",
                    gap:"0.5rem"
                }}
                onChange={handleChange}
                >
              <TextField
                  margin="normal"
                  label='Location'
                  name="location"
                  type="text"
                  sx={{width:"15rem", backdropFilter:"blur(7px)", position:"relative",    borderRadius:2, backgroundColor:"#FFFFFF",
              }}
                  InputProps={{
                      startAdornment: (
                          <InputAdornment position="start">
                              <GpsFixedIcon/>
                          </InputAdornment>
                      ),
                  }}
              />
              <TextField
                  margin="normal"
                  label='Property'
                  name="property_name"
                  type="text"
                  sx={{width:"15rem",backdropFilter:"blur(7px)",    borderRadius:2, backgroundColor:"#FFFFFF"
                  }}
                  InputProps={{
                      startAdornment: (
                          <InputAdornment position="start">
                              <ApartmentIcon/>
                          </InputAdornment>
                      ),
                  }}
              />

              <FormControl sx={{ width:"14.5rem",     borderRadius:2,backgroundColor:"#FFFFFF" }}>
                  <InputLabel htmlFor="unit_type" id="unit_type">
                      Unit Type
                  </InputLabel>
                  <Select
                      name="unit_type"
                      labelId="unit_type"
                      onChange={handleChange}
                      label="Select Unit Type"
                      InputProps={{
                          startAdornment: (
                              <InputAdornment position="start">
                                  <HomeIcon/>
                              </InputAdornment>
                          ),
                      }}
                  >
                      <MenuItem value={10}>Twenty</MenuItem>
                      <MenuItem value={21}>Twenty one</MenuItem>
                      <MenuItem value={22}>Twenty one and a half</MenuItem>
                  </Select>
              </FormControl>

              <TextField
                  margin="normal"
                  label='Price'
                  name="price"
                  type="text"
                  sx={{width:"15rem",
                          backgroundColor:"#FFFFFF",    borderRadius:2
                  }}
                  InputProps={{
                      startAdornment: (
                          <InputAdornment position="start">
                              <AttachMoneyIcon/>
                          </InputAdornment>
                      ),
                  }}
              />
           <Link to={url}>
               <Button sx={{backgroundColor:'#07779a' , paddingX:"2rem",paddingY:"0.5rem",textTransform:"none"
                   ,fontSize:"17px",
                   "&:hover":{backgroundColor:"#0f586b"},}}
                       startIcon={<SearchIcon />}
                       variant='contained'
                       disableElevation={true}
                       disableFocusRipple={true}
                       // onClick={handleSubmit}
               >Search</Button>
           </Link>

          </Box>
  )
}

export default Frostyform