import React from 'react'
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { Box, FormControl } from '@mui/material';

const Frostyform = () => {
    const [location, setLocation] = React.useState('');

    const handleChange = (event) => {
      setLocation(event.target);
  
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
                  <FormControl variant='filled' sx={{ width: "15%", marginRight: "2.5%" }}>
                  <InputLabel id="location">Location</InputLabel>
                        <Select
                        labelId='location'
                        
                        sx={{background:"white",borderTopLeftRadius:"10px",
                        borderTopRightRadius:'10px',
                        
                       }} 
                       onChange={handleChange}
                      label='location' >
                          <MenuItem value={10}>Twenty</MenuItem>
                          <MenuItem value={21}>Twenty one</MenuItem>
                          <MenuItem value={22}>Twenty one and a half</MenuItem>
                      </Select>
                  </FormControl>
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
    </div>
  )
}

export default Frostyform
