/* eslint-disable react/display-name */
import React, { forwardRef, useImperativeHandle, useState } from 'react'
// import { ListItemIcon,ListItemText, Paper } from '@mui/material'
// import {Box}from '@mui/material'
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormHelperText from '@mui/material/FormHelperText';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import Bathtub from '@mui/icons-material/Bathtub';
// import { useGetAllAmenitiesQuery } from '../../stores/landlordApi';



const AddAmenities = forwardRef((props, ref) => {
    
    const [amenity, setAmenity] = useState([])
    const amenities = props.amenities;


    const handleChange= async (event)=>{
        const {name, icon} =event.target.value;
        // console.log(name , icon)
        setAmenity(prevAmenity => [...prevAmenity,{name:name , icon:icon}]) 
        console.log('amenitynnnn\n', amenity)
        // props.addedAmenitiesHandler([...amenity,{name:name , icon:icon}])
        if(props.addedAmenitiesHandler){
            props.addedAmenitiesHandler([...amenity,{name:name , icon:icon}])
        }
        if(props.addedSpecialAmenitiesHandler){
            props.addedSpecialAmenitiesHandler([...amenity,{name:name , icon:icon}])
        }

    }

    useImperativeHandle(ref, ()=>({
        submitForm: () =>{


            console.log(amenity)
            // props.addedAmenitiesHandler(amenity)
            setAmenity([])
        }
    }));


  return (
    <div>
      <Box
      sx={{ maxWidth:'450px'}}
      >
        <FormControl
        fullWidth
        component={'form'}
        
        >
            <InputLabel id='amenities'>Amenities</InputLabel>
            <Select
            fullWidth
            labelId='amenities'
            label='Amenities'
            onChange={handleChange}
            name='amenity'
            >
                {amenities.map((amenit, index)=>(
                        <MenuItem value={amenit} key={index}>
                            <span
                            className="material-symbols-outlined"
                            >
                                {amenit.icon}
                            </span>
                            <ListItemText>{amenit.name}</ListItemText>
                            {/* {handleIdset(amenit._id)} */}
                            </MenuItem>
                ))}

            </Select>
        </FormControl>
        <Box
        display={'flex'}
        flexWrap={'wrap'}
        sx={{}}
        >
            {amenity.map((amenit,index)=>(
                        <MenuItem
                            sx={{width:'10px'}}
                         value={amenit.name} key={index}>
                            <span className="material-symbols-outlined">
                                {amenit.icon}
                            </span>
                            
                            </MenuItem>
                ))}
        </Box>

      </Box>
    </div>
  )
})

export default AddAmenities
