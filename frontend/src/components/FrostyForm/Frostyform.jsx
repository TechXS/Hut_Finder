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

    ////add to the handle submit function then send lat and lng to the backend for location filter, 
    const handleGeocode = async () => {
      try {
        const response = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${formData.location}&key=207d121f6a144cd7b1b049fb9497f409`
        );
  
        const { results } = response.data;
        if (results.length > 0) {
          const { lat, lng } = results[0].geometry;
          setCoordinates({ latitude: lat, longitude: lng });
          console.log(lat,lng);
        } else {
          console.error('Location not found');
        }
      } catch (error) {
        console.error('Error fetching geocode data', error);
      }
    };

    const handleSubmit =(e)=>{
     e.preventDefault();
     const {lat, lng}= handleGeocode(formData.location);
     console.log(formData);   
    }

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
                       onClick={handleSubmit}
               >Search</Button>
           </Link>

          </Box>
  )
}

export default Frostyform


{/*  <form onSubmit={handleGeocode}>*/}
{/*  <input*/}
{/*    type="text"*/}
{/*    value={address}*/}
{/*    onChange={(e) => setAddress(e.target.value)}*/}
{/*  />*/}
{/*  <button type="submit">Geocode</button>*/}
{/*</form>*/}
{/*{coordinates && (*/}
{/*  <div>*/}
{/*    <p>Latitude: {coordinates.latitude}</p>*/}
{/*    <p>Longitude: {coordinates.longitude}</p>*/}
{/*  </div>*/}
{/*)}*/}