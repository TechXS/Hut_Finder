import React, { useState } from 'react'
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { Box, FormControl } from '@mui/material';
import axios from 'axios';

const Frostyform = () => {
    const handleChange = (event) => {
      setLocation(event.target);
      
    };

    const [address, setAddress] = useState('');
    const [coordinates, setCoordinates] = useState(null);
    
    const handleGeocode = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${address}&key=207d121f6a144cd7b1b049fb9497f409`
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

                </Box>
        <form onSubmit={handleGeocode}>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button type="submit">Geocode</button>
      </form>
      {coordinates && (
        <div>
          <p>Latitude: {coordinates.latitude}</p>
          <p>Longitude: {coordinates.longitude}</p>
        </div>
      )}
    </div>
  )
}

export default Frostyform
