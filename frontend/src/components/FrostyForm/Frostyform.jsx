import React, { useState } from 'react'
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { Box, FormControl } from '@mui/material';

const Frostyform = () => {


    const handleChange = (event) => {
      setLocation(event.target);
  
    };


    const [address, setAddress] = useState('');
    const [location, setLocation] = useState(null);
    const [error, setError] = useState('');
  
    const geocodeAddress = () => {
      const encodedAddress = encodeURIComponent(address);
  
      fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodedAddress}&key=207d121f6a144cd7b1b049fb9497f409`)
        .then(response => response.json())
        .then(data => {
          if (data.results.length > 0) {
            const result = data.results[0];
            const formattedAddress = result.formatted;
            const coordinates = result.geometry;
  
            setLocation({
              formattedAddress,
              latitude: coordinates.lat,
              longitude: coordinates.lng
            });
          } else {
            setError('Geocode was not successful.');
          }
        })
        .catch(error => {
          console.error('Error during geocoding:', error);
          setError('Error during geocoding.');
        });
    };
  
    const handleInputChange = (event) => {
      setAddress(event.target.value);
    };
  


  return (
    <div>
          <Box
                component="form"
                height={'10vh'}
                width={"80vw"}
                display={'flex'}
                justifyContent={"space-around"}
                alignItems={"center"}
                sx={{backdropFilter:"blur(7px)",
                border:"solid",
                borderColor:"white",
                borderWidth:"1px",
                borderRadius:"10px",
                }}
                >
                  <TextField 
                        variant='filled'
                        sx={{background:"white",borderTopLeftRadius:"10px",
                        borderTopRightRadius:'10px' ,margin:'5px',width: "15%", marginRight: "2.5%"}}
                        label='location'  />
                  <TextField 
                        variant='filled'
                        sx={{background:"white",borderTopLeftRadius:"10px",
                        borderTopRightRadius:'10px',margin:'5px',width: "15%", marginRight: "2.5%" }}
                        label='property'  />
                        <FormControl variant='filled' sx={{ width: "15%", marginRight: "2.5%" }}>
                  <InputLabel id="unit">Unit type</InputLabel>
                        <Select
                        labelId='unit'
                        
                        sx={{background:"white",borderTopLeftRadius:"10px",
                        borderTopRightRadius:'10px',
                        
                       }} 
                       onChange={handleChange}
                      label='Unit type' >
                          <MenuItem value={10}>Twenty</MenuItem>
                          <MenuItem value={21}>Twenty one</MenuItem>
                          <MenuItem value={22}>Twenty one and a half</MenuItem>
                      </Select>
                  </FormControl>
                        <TextField 
                        variant='filled'
                        sx={{background:"white",borderTopLeftRadius:"10px",
                        borderTopRightRadius:'10px' ,margin:'5px',width: "15%", marginRight: "2.5%"}}
                        label='price'  />
                        <Button 
                        sx={{backgroundColor:'#07779a'}}
                        startIcon={<SearchIcon />}
                        variant='contained'>Search</Button>
        <input
        type="text"
        id="addressInput"
        placeholder="Enter an address"
        value={address}
        onChange={handleInputChange}
      />
      <button onClick={geocodeAddress}>Geocode</button>

      {location && (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          <p>Address: {location.formattedAddress}</p>
        </div>
      )}

      {error && <p>{error}</p>}

                </Box>
    </div>
  )
}

export default Frostyform
