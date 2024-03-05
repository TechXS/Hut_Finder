import "./PropertEditPage.css";
import Navbar from "../../components/NavBar/NavBar";
// import Header from "../../components/header/Header";
// import Footer from "../../components/Footer/Footer";
import PropertyListing from "../../components/PropertyListing/PropertyListing"
import PropertyHeader from "../../components/PropertyHeader/PropertyHeader"
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import CancelIcon from '@mui/icons-material/Cancel';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import WifiIcon from '@mui/icons-material/Wifi';
import BathtubIcon from '@mui/icons-material/Bathtub';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from "react";
import Button from '@mui/material/Button';
import { Box, TextField } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Imageupload from "../../components/FileUpload/Imageupload";
import ListingItemEdit from "../../components/PropertyListingEdit/PropertyListingEdit";

const PropertyEditPage = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [clicked,  setclicked] = useState(false)
  const [open, setOpen] = useState(false);
  const [photos, setPhotos] = useState([
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
    },
  ])

  const [amenities ,setAmenities]= useState([
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

  ])
  const  propertyname = 'Cascade Plaza'
  const  propertyDesc = 'Located a 5-minute walk from Juja city mall in Juja,Cascade Plaza is a spacious appartment with air conditioning and free WiFi installation. The units come with hardwood floors and feature a fully equipped kitchenette with sliding drawers, modern taps, and a private bathroom with shower. Popular points of interest near the apartment include Juja police station, Main Market Square and Aghakan  University Hospital. The nearest petrol station is Shell petrol, 16.1 km from Cascade Plaza, and the property offers a paid gabbage collection'
 

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handlePhotoDelete = (index) => {
    if (index >= 0 && photos.length > index) {
      const updatedPhotos = photos.filter((_, i) => i !== index);
      setPhotos(updatedPhotos);
    }
  };

  const handleAmenitiesDelete = (index) => {
    if (index >= 0 && amenities.length > index) {
      const updatedAmenities = amenities.filter((_, i) => i !== index);
      setAmenities(updatedAmenities);
    }
  };

  const handleMove = (direction) => {
    let newSlideNumber;
    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber);
  };

  return (
    <div>
      <Navbar />
      <Button onClick={()=>{setclicked(!clicked)}}>
        Edit
      </Button>
      












     {clicked ? 
     <div>
        <Box>
        <div className="PropWrapper">
          <TextField 
          className="PropTitle" 
          name="name"
          defaultValue={propertyname}
          label='Propert name'
          variant="standard"
          sx={{margin:'10px'}}
          />
          <div className="PropAddress">
            <LocationOnIcon />
            <span>Sunrise St 125 Juja</span>
          </div>
          <span className="PropDistance">
            Excellent location – 500m from center
          </span>
          <span className="PropPriceHighlight">
            Book an apointment with Agent to get a free tour of the Apartment
          </span>
            <Imageupload />
          <div className="PropImages">
            {photos.map((photos, i) => (
              <div className="PropImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photos.src}
                  alt=""
                  className="PropImg"
                />
                <IconButton  onClick={() => handlePhotoDelete(i)}aria-label="delete" size="large">
                <DeleteIcon fontSize="inherit" />
                </IconButton>
              </div>
            ))}
          </div>
          <div className="PropDetails">
            <div className="PropDetailsTexts">
              <h1 className="PropTitle">Stay in the heart of City</h1>
              < TextField 
                defaultValue={propertyDesc}
                label='Propert description'
                variant="standard"
                sx={{margin:'10px'}}
                className="PropDesc"
                fullWidth
                multiline
              />
                
             
              <div className="PropDetailsExtra">
                <div className="PropDetailsWrapper">
                  <div className="PropIcons">
                    {amenities.map((amenity, index)=>(<div className="iconWithText" key={index}>
                    {amenity.element}
                    <span>{amenity.name}</span>
                    <IconButton  onClick={() => handleAmenitiesDelete(index)}aria-label="delete" size="large">
                    <DeleteIcon fontSize="inherit" />
                    </IconButton>
                    </div>))}
                  </div>
                </div>
              </div>
            </div>
            <div className="PropDetailsPrice">
              <h1>Get what you need</h1>
              <span>
                Located at the real heart of Juja City Mall, this property has an
                excellent location score of 9.8!
              </span>
              <h1>Perfect for a family stay!</h1>
              <span>
                Top Location: Highly rated by recent guests (8.7/10).
              </span>
              {/* <h1>Apppartments with:</h1>
              <span>
                Garden view
                Inner courtyard view
                Free underground parking on site
              </span> */}
              <h2>
                <b>$945</b>
              </h2>
              
            </div>
          </div>
        </div>
        <div className="propInfo">
          <PropertyHeader/>
          <div className="flex-container">
            <ListingItemEdit />
            <ListingItemEdit />
            <ListingItemEdit />
            <ListingItemEdit />
            <ListingItemEdit />
            <ListingItemEdit />
            <ListingItemEdit />
            <ListingItemEdit />
          </div>
        </div>
            </Box>
     </div>:











     <div>
        {/* <Header /> */}
      <div className="PropContainer">
        {open && (
          <div className="slider">
            <CancelIcon
              className="close"
              onClick={() => setOpen(false)}
            />
            <ArrowCircleLeftIcon
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={photos[slideNumber].src} alt="" className="sliderImg" />
            </div>
            <ArrowCircleRightIcon
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="PropWrapper">
          <h1 className="PropTitle">{propertyname}</h1>
          <div className="PropAddress">
            <LocationOnIcon />
            <span>Sunrise St 125 Juja</span>
          </div>
          <span className="PropDistance">
            Excellent location – 500m from center
          </span>
          <span className="PropPriceHighlight">
            Book an apointment with Agent to get a free tour of the Apartment
          </span>
          <div className="PropImages">
            {photos.map((photos, i) => (
              <div className="PropImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photos.src}
                  alt=""
                  className="PropImg"
                />
              </div>
            ))}
          </div>
          <div className="PropDetails">
            <div className="PropDetailsTexts">
              <h1 className="PropTitle">Stay in the heart of City</h1>
              <p className="PropDesc">
                Located a 5-minute walk from Juja city mall in Juja,
                Cascade Plaza is a spacious appartment with air conditioning and
                free WiFi installation. The units come with hardwood floors and feature a
                fully equipped kitchenette with sliding drawers, modern taps,
                and a private bathroom with shower. Popular points of interest near the
                apartment include Juja police station, Main Market Square and Aghakan  University Hospital.
                The nearest petrol station is Shell petrol, 16.1 km
                from Cascade Plaza, and the property offers a paid gabbage collection
              </p>
              <div className="PropDetailsExtra">
                <div className="PropDetailsWrapper">
                  <div className="PropIcons">
                    <div className="iconWithText">
                      <ApartmentIcon />
                      <span>Apartment</span>
                    </div>
                    <div className="iconWithText">
                      <LocalFloristIcon />
                      <span>Garden</span>
                    </div>
                    <div className="iconWithText">
                      <WifiIcon />
                      <span>Wifi</span>
                    </div>
                    <div className="iconWithText">
                      <BathtubIcon />
                      <span>Washrooms</span>
                    </div>
                    <div className="iconWithText">
                      <LocalParkingIcon />
                      <span>Parking</span>
                    </div>
                    <div className="iconWithText">
                      <VisibilityIcon />
                      <span>View</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="PropDetailsPrice">
              <h1>Get what you need</h1>
              <span>
                Located at the real heart of Juja City Mall, this property has an
                excellent location score of 9.8!
              </span>
              <h1>Perfect for a family stay!</h1>
              <span>
                Top Location: Highly rated by recent guests (8.7/10).
              </span>
              {/* <h1>Apppartments with:</h1>
              <span>
                Garden view
                Inner courtyard view
                Free underground parking on site
              </span> */}
              <h2>
                <b>$945</b>
              </h2>
              <button>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        <div className="propInfo">
          <PropertyHeader/>
          <div className="flex-container">
            <PropertyListing />
            <PropertyListing />
            <PropertyListing />
            <PropertyListing />
            <PropertyListing />
            <PropertyListing />
            <PropertyListing />
            <PropertyListing />
          </div>
        </div>
        {/* <Footer /> */}
      </div>
     </div>
     }
    </div>
  );
};

export default PropertyEditPage;
