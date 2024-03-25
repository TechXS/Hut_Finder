import { useState } from "react";
import ImageuploadSingle from "../FileUpload/ImageUploadSingle";
import "./PropertListingEdit.css";
import { Box, TextField } from "@mui/material";
import Carousel from "../Carousel/Carousel";
import { Button } from "@mui/base";
import {unitTypes} from "../../utils/dataUtil.js";
export default function ListingItemEdit({ unit, updatedUnit }) {
  // console.log('e', unit);
  const [listing, setListing] = useState(unit);
  const carouselData = unit && unit.images && unit.images.map((image) => ({
    src: image.imageUrl,
    alt:  unitTypes[unit.type].type ,
  })); 
  const [unitObj, setUnitObj] = useState({});

  const handleChange = (event)=>{
    const {name, value}=  event.target;
    const parsedValue = parseInt(value);
    setListing((prevListing)=>({
        ...prevListing, [name]:parsedValue,
    }))
    setUnitObj((prevUnit)=>({
      ...prevUnit, _id: unit._id, [name]:parsedValue,
    }))
  }

  const handleSubmit = (event)=>{
    event.preventDefault();
    updatedUnit(unitObj);
  }
  return (
    <div className="listing-card">
      <div className="carousel-wrapper">
        <Carousel data={carouselData}/> {/* Render the Carousel component */}
      </div>
      <ImageuploadSingle />
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
}
