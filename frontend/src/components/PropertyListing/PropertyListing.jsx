/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import { useState, forwardRef, useImperativeHandle, useRef, useEffect} from "react";
import Imageupload from "../FileUpload/Imageupload.jsx";
import "./propertyListing.css";
import { Box, TextField } from "@mui/material";
import CarouselEdit from "../CarouseEdit/CarouselEdit.jsx";
import { Button } from "@mui/base";
import {unitTypes} from "../../utils/dataUtil.js";
import AddAmenities from "../AddAmenities/AddAmenities.jsx";
import { 
  useGetAllAmenitiesQuery,
} from "../../stores/landlordApi";

import * as React from 'react';
import Modal from '@mui/material/Modal';

const PropertyListingEdit = forwardRef(( props ,ref) => {
  const { data: all_amenities, error: amenitiesError, isLoading: amenitiesLoading } = useGetAllAmenitiesQuery();
  // console.log('all_amenities\n', all_amenities)
  if (amenitiesError){
    console.error(amenitiesError)
  } 


  const {unit, updatedUnit, updateUnitPhotos} = props

  const amenityUploadRef = useRef();
  // console.log('e', unit);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [addedAmenities, setAddedAmenities] = useState([]);
  const [unitPhotos, setUnitPhotos] = useState([]);

  const [listing, setListing] = useState(unit);
  const carouselData = unit && unit.images && unit.images.map((image) => ({
    src: image.imageUrl,
    alt:  unitTypes[unit.type].type ,
  })); 
  const [unitObj, setUnitObj] = useState({});
  const images = unit.images;
  const id = unit._id;

  const updateUnitImages = async (photo) => {
    setUnitPhotos(photo);
  }

  const handleChange = (event)=>{
    const {name, value}=  event.target;
    const parsedValue = parseInt(value);
    setListing((prevListing)=>({
        ...prevListing, [name]:parsedValue,
    }))
    setUnitObj((prevUnit)=>({
      ...prevUnit, 
      _id: unit._id, 
      [name]:parsedValue,
    }))
  }

  useImperativeHandle(ref, () => ({
    submitForm: () => {
        //put submit logic here

      console.log('ello govner')
      
    },
  }));

  useEffect(() => {
    (async () => {
      console.log('unit special amenities\n', addedAmenities)
      if (addedAmenities.length > 0){
        setUnitObj((prevUnit)=>({
          ...prevUnit,
          _id: unit._id, 
          amenities: addedAmenities
        }))  
      }     
    })()
}, [addedAmenities]);

  const handleSubmit = (event)=>{
    event.preventDefault();
    //put the submit function here 
    console.log('addedAmenities\n', addedAmenities)
    console.log()
    console.log('unitObj\n', unitObj)
    if (Object.keys(unitObj).length > 0) {
      updatedUnit(unitObj);
      console.log('unitObjNot empty\n', unitObj)
    }
    updateUnitPhotos(unitPhotos);
  }

  const addedSpecialAmenitiesHandler = async (amenity) => {
    setAddedAmenities(amenity);
  } 

  return (
    <div className="listing-card">
      <div className="carousel-wrapper" >
      <img src={carouselData[0].src} alt="hellp"  onClick={handleOpen}/>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <CarouselEdit images={images} id={id}/> {/* Render the Carousel component */}
        </Box>
      </Modal>

      </div>
      <Imageupload id ={id} updateUnitPhotos={updateUnitImages} />
      <div className='listing-details'>
        <p className='listing-name'>{unitTypes[listing.type].type}</p>
        <div className="listing-desc">
            <Box
            component={"form"}
            >

          <TextField 
          className='listing-price'
          defaultValue={listing.price}
          name="price"
          label='Unit price'
          type="number"
          variant="standard"
          sx={{margin:'10px', width:'100px'}} 
          onChange={handleChange}
          />
          <TextField 
          name="vacancies"
          className='listing-info'
          defaultValue={listing.vacancies}
          label='Edit Vacancies'
          type="number"
          variant="standard"
          sx={{margin:'10px', width:'100px'}} 
          onChange={handleChange}
          />
          <Button type="submit" onClick={handleSubmit}>SUbmit</Button>
            </Box>
        </div>
        <AddAmenities
        ref={amenityUploadRef} handleSubmit={handleSubmit} amenities={all_amenities} addedSpecialAmenitiesHandler={addedSpecialAmenitiesHandler}
        />
        <div className='listing-features'>
          {
            listing?.special_amenities?.map((special_amenity, index) => (
                <div className="feature">{special_amenity.name}</div>
            ))
          }
        </div>
      </div>
    </div>
  );
})
export default PropertyListingEdit