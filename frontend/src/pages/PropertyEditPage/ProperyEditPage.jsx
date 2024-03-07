import "./PropertEditPage.css";
import Navbar from "../../components/NavBar/NavBar";
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
import { Button } from "@mui/base";
import { Box, TextField } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Imageupload from "../../components/FileUpload/Imageupload";
import ListingItemEdit from "../../components/PropertyListingEdit/PropertyListingEdit";
import { useRef } from "react";
import DateTimePicker from "../../components/DateTimePicker/DateTimePicker";
import AddAmenities from "../../components/AddAmenities/AddAmenities";

const PropertyEditPage = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [clicked,  setclicked] = useState(false)
  const [open, setOpen] = useState(false);
  const imageUploadRef1 = useRef();
  const [photos, setPhotos] = useState([
    {
      src: "../../../public/images/property3.jpg",
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
      src: "../../../public/images/property3.jpg",
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
  const [formData, setFormData] = useState({})
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
    const numPhotos = photos.length;
  
    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? numPhotos - 1 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === numPhotos - 1 ? 0 : slideNumber + 1;
    }
    
    setSlideNumber(newSlideNumber);
  };

  const handleSubmit =(e)=>{
    e.preventDefault();
    //send form data images and other object  to the database 
    console.log(formData)
    imageUploadRef1.current.submitForm();
    setclicked(!clicked)
  }

  const handleChange = (event) =>{
    const {name, value } = event.target;
    const newForm = (formData) =>({
      ...formData, [name]: value,
    })
    setFormData(newForm)
  }

  return (
  <>
    <div>
      <Navbar />
          
          












        {clicked ? 
        <div>
            <Box
            component={'form'}
            >
            <Button onClick={handleSubmit}>
            Submit
            </Button>
            <div className="PropWrapper">
              <TextField 
              className="PropTitle" 
              name="propertyName"
              defaultValue={propertyname}
              label='Propert name'
              variant="standard"
              sx={{margin:'10px'}}
              onChange={handleChange}
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
                <Imageupload ref={imageUploadRef1} handleSubmit={handleSubmit}/>
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
                    name='propertyDescription'
                    label='Propert description'
                    variant="standard"
                    sx={{margin:'10px'}}
                    className="PropDesc"
                    fullWidth
                    onChange={handleChange}
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
                      <div style={{marginTop:'20px'}}>

                        <AddAmenities ref={imageUploadRef1} handleSubmit={handleSubmit}/>
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
          <Button onClick={()=>{setclicked(!clicked)}}>
            Edit
          </Button>
          <div className="PropContainer">
            {open && (
              <div className="slider">
                <span className="close" onClick={() => setOpen(false)}>
                  <span className="material-symbols-outlined">cancel</span>
                </span>
                <span className="arrow" onClick={() => handleMove("l")}>
                  <span className="material-symbols-outlined">arrow_circle_left</span>
                </span>
                <div className="sliderWrapper">
                  <img src={photos[slideNumber].src} alt="" className="sliderImg" />
                </div>
                <span className="arrow" onClick={() => handleMove("r")}>
                  <span className="material-symbols-outlined">arrow_circle_right</span>
                </span>
              </div>
            )}
            <div className="PropWrapper">
              <h1 className="PropTitle">Cascade Plaza</h1>
              <div className="PropAddress">
                <span className="material-symbols-outlined">location_on</span>
                <span>Sunrise St 125 Juja</span>
              </div>
              <span className="PropDistance">
                Excellent location – 500m from center
              </span>
              <span className="PropPriceHighlight">
                Book an apointment with Agent to get a free tour of the Apartment
              </span>
              <div className="PropImages">
                {photos.slice(0, 6).map((photo, i) => (
                  console.log(photos),
                  <div className="PropImgWrapper" key={i}>
                    <img
                      onClick={() => handleOpen(i)}
                      src={photo.src}
                      alt=""
                      className="PropImg"
                    />
                  </div>
                ))}
                {photos.length > 6 && (
                <div className="ExtraImagesCounter">
                  <span className="ExtraImagesCounterText">+{photos.length - 6} Photos</span>
                </div>
                )}
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
                          <span className="material-symbols-outlined">apartment</span>
                          <span>Apartment</span>
                        </div>
                        <div className="iconWithText">
                          <span className="material-symbols-outlined">local_florist</span>
                          <span>Garden</span>
                        </div>
                        <div className="iconWithText">
                          <span className="material-symbols-outlined">wifi</span>
                          <span>Wifi</span>
                        </div>
                        <div className="iconWithText">
                          <span className="material-symbols-outlined">bathtub</span>
                          <span>Washrooms</span>
                        </div>
                        <div className="iconWithText">
                          <span className="material-symbols-outlined">local_parking</span>
                          <span>Parking</span>
                        </div>
                        <div className="iconWithText">
                          <span className="material-symbols-outlined">visibility</span>
                          <span>View</span>
                        </div>
                        <div className="iconWithText">
                          <span className="material-symbols-outlined">smoke_free</span>
                          <span>Smoke Free</span>
                        </div>
                        <div className="iconWithText">
                          <span className="material-symbols-outlined">fitness_center</span>
                          <span>Gym</span>
                        </div>
                        <div className="iconWithText">
                          <span className="material-symbols-outlined">pool</span>
                          <span>Pool</span>
                        </div>
                        <div className="iconWithText">
                          <span className="material-symbols-outlined">balcony</span>
                          <span>Balcony</span>
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
                  <div className="date">
                    <DateTimePicker/>
                  </div>
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
  </>
  );
};

export default PropertyEditPage;
