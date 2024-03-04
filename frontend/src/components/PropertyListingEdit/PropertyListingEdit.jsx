import { useState } from "react";
import ImageuploadSingle from "../FileUpload/ImageUploadSingle";
import "./PropertListingEdit.css";
import { Box, TextField } from "@mui/material";
import { Button } from "@mui/base";
export default function ListingItemEdit() {
  const [listing, setListing] = useState({
    _id: '1',
    imageUrls: ['https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1'],
    name: 'Spacious House with a Balcony',
    offer: true,
    price: 1500,
    vacancy: 10,
    type: '3 bedroom',
    bedrooms: "3 bedrooms",
    view: "Ocean View",
    floor: "Tiled floors",
    internet: "Free wifi",
    water: "24hr water flow",
    electricity: "Tokens(Power)",
  });


  const handleChange = (event)=>{
    const {name, value}=  event.target;
    setListing((prevListing)=>({
        ...prevListing, [name]:value,
    }))
  }

  const handleSubmit = (event)=>{
    event.preventDefault();
    console.log(listing)
  }
  return (
    <div className="listing-card">
      <img
        src={listing.imageUrls[0]}
        alt='listing cover'
      />
      <ImageuploadSingle />
      <div className='listing-details'>
        <p className='listing-name'>{listing.name}</p>
        <div className="listing-desc">
            <Box
            component={"form"}
            
            >

          <TextField 
          className='listing-price'
          defaultValue={listing.price}
          name="price"
          label='Unit price'
          variant="standard"
          sx={{margin:'10px', width:'100px'}} 
          onChange={handleChange}
          />
          <TextField 
          name="vacancy"
          className='listing-info'
          defaultValue={listing.vacancy}
          label='Edit Vacancies'
          variant="standard"
          sx={{margin:'10px', width:'100px'}} 
          onChange={handleChange}
          />
          <Button type="submit" onClick={handleSubmit}>SUbmit</Button>
            </Box>
        </div>
        <div className='listing-features'>
          <div className='feature'>{listing.bedrooms}</div>
          <div className='feature'>{listing.view}</div>
          <div className='feature'>{listing.floor}</div>
          <div className='feature'>{listing.internet}</div>
          <div className='feature'>{listing.water}</div>
          <div className='feature'>{listing.electricity}</div>
        </div>
      </div>
    </div>
  );
}
