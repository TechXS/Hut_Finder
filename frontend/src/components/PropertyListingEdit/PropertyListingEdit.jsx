import { useRef, useState } from "react";
import ImageuploadSingle from "../FileUpload/ImageUploadSingle";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Carousel from '../Carousel/Carousel';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import WifiIcon from '@mui/icons-material/Wifi';
import BathtubIcon from '@mui/icons-material/Bathtub';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import VisibilityIcon from '@mui/icons-material/Visibility';
import "./PropertListingEdit.css";
import { Box, TextField } from "@mui/material";
import Button from '@mui/material/Button';
import Imageupload from "../FileUpload/Imageupload";

export default function ListingItemEdit() {
  
//static unit 
  const [clicked, setclicked]=useState(true)
  console.log(clicked)
  const [photoeditstatus, setphotoeditstatus] = useState(true)
  const [listing, setListing] = useState({
    _id: '1',
    imageUrls: ['https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1'],
    name: 'Spacious House with a Balcony',
    offer: true,
    price: 1500,
    vacancy: 10,
    type: '3 bedroom',
    special_amenities: [
      {
        name: "Apartment",
        element: <ApartmentIcon />
    },
    {
        name: "Garden",
        element: <LocalFloristIcon />
    },
    {
        name: "Wifi",
        element:<WifiIcon />
    },
    {
        name: "Washrooms",
        element:<BathtubIcon />
    },
    {
        name:"Parking",
        element: <LocalParkingIcon />
    },
    {
        name:"View",
        element:<VisibilityIcon />
    }
    ],
  });
console.log(listing)
  const imageuploadref= useRef();
  //gotten from the unit 
  const carouselData = [
    {
      src: "../../../public/images/property3.jpg",
      alt:'hello'
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
      alt:'hello'
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
      alt:'hello'
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
      alt:'hello'
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
      alt:'hello'
    },
    {
      src: "../../../public/images/property3.jpg",
      alt:'hello'
    },
  ]


  const handleChange = (event)=>{
    const {name, value}=  event.target;
    setListing((prevListing)=>({
        ...prevListing, [name]:value,
    }))
  }

  const handleSubmit = (event)=>{
    setclicked(!clicked)
    event.preventDefault();
    setphotoeditstatus(false)
    imageuploadref.current.submitForm();
    console.log(listing)
  }
  return (
    <div>
      { clicked ? 
      <div className="listing-card">
        <div className="carousel-wrapper">
                <Carousel data={carouselData } editstatus={clicked}/> {/* Render the Carousel component */}
              </div>
        <Imageupload ref={imageuploadref} handleSubmit={handleSubmit}/>
        <div className='listing-details'>
        <p className="listing-type">{listing.type}</p>
          <div className="listing-desc">
              <Box
              component={"form"}
              
              >
  
        <TextField 
        className="listing-name" 
        defaultValue={listing.name}
            name="name"
            label='Unit name'
            variant="standard"
            sx={{margin:'10px', width:'100px'}} 
            onChange={handleChange}
        />
        <TextField 
        className="listing-type" 
        defaultValue={listing.type}
            name="type"
            label='Unit type'
            variant="standard"
            sx={{margin:'10px', width:'100px'}} 
            onChange={handleChange}
        />
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
            <Button onClick={handleSubmit}>Submit</Button>
              </Box>
          </div>
          <div className='listing-features'>
          {
                    listing.special_amenities.map((special_amenity, index) => (
                        <div className="feature">{special_amenity.name}</div>
                    ))
                  }
          </div>
        </div>
      </div>:
      
      
      <>
     
          <div className="listing-card">
                <div className="carousel-wrapper">
                  <Carousel data={carouselData} editstatus={clicked}/> {/* Render the Carousel component */}
                </div>
                <div className="listing-details">
                  <p className="listing-name">{listing.name}</p>
                  <p className="listing-type">{listing.type}</p>
                  <div className="listing-desc">
                    <p className="listing-price">Ksh {listing.price.toLocaleString()}</p>
                    <p className="listing-info">Available : {listing.vacancy.toLocaleString()}</p>
                  </div>
                  <div className="listing-features">
                    {
                      listing.special_amenities.map((special_amenity, index) => (
                          <div className="feature">{special_amenity.name}</div>
                      ))
                    }
                  </div>
                  <Button onClick={()=>{setclicked(!clicked)}}  >Edit</Button>
                </div>
              </div>
          
      </>
    
    }
    </div>
  );
}
