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
import {useEffect, useState} from "react";
import Button from '@mui/material/Button';
import { Box, TextField } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Imageupload from "../../components/FileUpload/Imageupload";
import ListingItemEdit from "../../components/PropertyListingEdit/PropertyListingEdit";
import { useRef } from "react";
import DateTimePicker from "../../components/DateTimePicker/DateTimePicker";
import AddAmenities from "../../components/AddAmenities/AddAmenities";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentLandlord, selectPropertyData, setPropertyData} from "../../stores/landlordSlice.js";
import {useParams} from "react-router-dom";
import {notification, setErrorNotification, setLoadingNotification} from "../../stores/notificationSlice.js";
import {handleReverseGeocode} from "../../utils/geocode.js";
import { useGetPropertiesQuery, useGetPropertyQuery, useGetAllAmenitiesQuery } from "../../stores/landlordApi";
import { selectCurrentProperty } from "../../stores/propertySlice";


const PropertyEditPage = () => { 

  const landlord = useSelector(selectCurrentLandlord)
  console.log('landlord', landlord)
  const currentProperty = useSelector(selectCurrentProperty)
  console.log('currentProperty', currentProperty)
  const dispatch = useDispatch();
  const landlord_id = landlord._id;
  console.log('landlord_id', landlord_id)
  const id = useParams().id
  // const id = currentProperty._id;
  console.log('id', id) 
  // console.log('current property id', currentProperty._id)
  const [Loading, setLoading] = useState(false);
  const { data: properties, isError, isLoading: propertiesLoading, error: propertiesError } = useGetPropertiesQuery(landlord_id);
  console.log('id1', id, 'id2', landlord_id)
  const { data: property, isError: propertyError , isLoading: propertyLoading, error: fetchError } = useGetPropertyQuery({id: landlord_id, property_id: id});
  console.log('properties\n', properties)
  const { data: all_amenities, error: amenitiesError, isLoading: amenitiesLoading } = useGetAllAmenitiesQuery();
  console.log('all_amenities\n', all_amenities)
  if (amenitiesError){
    console.error(amenitiesError)
  } 
  const [location,setLocation] = useState({});
  const {success, error, isLoading} = useSelector(notification);
  // const {id, layout} = useParams();
  const [slideNumber, setSlideNumber] = useState(0);
  const [clicked,  setclicked] = useState(false)
  const [open, setOpen] = useState(false);
  const imageUploadRef1 = useRef();
  const [photos, setPhotos] = useState([]);
  const [amenities, setAmenities] = useState([]);

  useEffect(() => {
    setLoading(true)
    if (property) {
      dispatch(setPropertyData(property));
    }
    if (isError) {
      console.error(fetchError)
      dispatch(setErrorNotification(fetchError.data.message))
    } else {
      dispatch(setLoadingNotification(propertyLoading));
    }
  }, [property, fetchError, propertyLoading]);

  const getLocation = async (property)=>{
    try{
      // const currentLocation = JSON.parse(sessionStorage.getItem("location"))
      // console.log(currentLocation)
      //
      // let location  = await handleReverseGeocode(currentLocation.latitude,currentLocation.longitude)

      let location  = await handleReverseGeocode(property.location.coordinates[1],property.location.coordinates[0])
      setLocation(location)
      const images = property?.images
      setPhotos(images)
      const amenities = property?.amenities
      setAmenities(amenities)
    }catch (e) {
      console.error(e.message)
    }
  }


  useEffect(() => {
    if(property?.location !== undefined){
      getLocation(property)
    }

  }, [property]);
  console.log('property\n', property)


  const [formData, setFormData] = useState({}) 

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
    { property && <div>
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
                        defaultValue={property?.name}
                        label='Propert name'
                        variant="standard"
                        sx={{margin: '10px'}}
                        onChange={handleChange}
                    />
                    <div className="PropAddress">
                      <span className="material-symbols-outlined">location_on</span>
                      <span>{location?.formatted}</span>
                    </div>
                    <span className="PropDistance">
                Excellent location – 500m from center
              </span>
                    <span className="PropPriceHighlight">
                Book an apointment with Agent to get a free tour of the Apartment
              </span>
                    <Imageupload ref={imageUploadRef1} handleSubmit={handleSubmit}/>
                    <div className="PropImages">
                      {photos.slice(0, 6).map((photo, i) => (
                          <div className="PropImgWrapper" key={i}>
                            <img
                                onClick={() => handleOpen(i)}
                                src={photo}
                                alt=""
                                className="PropImg"
                            />
                            <IconButton onClick={() => handlePhotoDelete(i)} aria-label="delete" size="large">
                              <DeleteIcon fontSize="inherit"/>
                            </IconButton>
                          </div>
                      ))}
                    </div>
                    <div className="PropDetails">
                      <div className="PropDetailsTexts">
                        <h1 className="PropTitle">Stay in the heart of City</h1>
                        < TextField
                            defaultValue={property?.description}
                            name='propertyDescription'
                            label='Propert description'
                            variant="standard"
                            sx={{margin: '10px'}}
                            className="PropDesc"
                            fullWidth
                            onChange={handleChange}
                            multiline
                        />


                        <div className="PropDetailsExtra">
                          <div className="PropDetailsWrapper">
                            <div className="PropIcons">
                              {property?.amenities.map(
                                (amenity, index) => (
                                <div className="iconWithText" key={index}>
                                <span className="material-symbols-outlined">{amenity.icon}</span>
                                <span>{amenity.name}</span>
                                <IconButton onClick={() => handleAmenitiesDelete(index)} aria-label="delete"
                                            size="large">
                                  <DeleteIcon fontSize="inherit"/>
                                </IconButton>
                              </div>))}
                            </div>
                            <div style={{marginTop: '20px'}}>

                              <AddAmenities ref={imageUploadRef1} handleSubmit={handleSubmit} amenities={all_amenities}/>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div className="PropDetailsPrice">
                        <h1>Get what you need</h1>
                        <span>
                    Located at the real heart of Juja City Mall, this property has an
                    excellent location score of 9.8!
                  </span>
                        <h1>Perfect for a family stay!</h1>
                        <span>
                    Top Location: Highly rated by recent guests (8.7/10).
                  </span>
                        <h1>Apppartments with:</h1>
                  <span>
                    Garden view
                    Inner courtyard view
                    Free underground parking on site
                  </span>
                        <h2>
                          <b>$945</b>
                        </h2>

                      </div> */}
                    </div>
                  </div>
                  <div className="propInfo">
                    <PropertyHeader/>
                    <div className="flex-container">
                      {/* <ListingItemEdit/>
                      <ListingItemEdit/>
                      <ListingItemEdit/>
                      <ListingItemEdit/>
                      <ListingItemEdit/>
                      <ListingItemEdit/>
                      <ListingItemEdit/>
                      <ListingItemEdit/> */}
                      {
                        property.units && property.units.map((unit, index) => (
                            <ListingItemEdit unit={unit} key={index}/>
                        ))
                      }
                    </div>
                  </div>
                </Box>
              </div>
              :

              <div>
                {/* <Header /> */}
                <Button onClick={() => {
                  setclicked(!clicked)
                }}>
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
                          <img src={photos[slideNumber].src} alt="" className="sliderImg"/>
                        </div>
                        <span className="arrow" onClick={() => handleMove("r")}>
                  <span className="material-symbols-outlined">arrow_circle_right</span>
                </span>
                      </div>
                  )}
                  <div className="PropWrapper">
                    <h1 className="PropTitle">{property?.name}</h1>
                    <div className="PropAddress">
                      <span className="material-symbols-outlined">location_on</span>
                      <span>{location?.formatted}</span>
                    </div>
                    <span className="PropDistance">
                Excellent location – 500m from center
              </span>
                    <span className="PropPriceHighlight">
                Book an apointment with Agent to get a free tour of the Apartment
              </span>
                    <div className="PropImages">
                      {photos.slice(0, 6).map((photo, i) => (
                              <div className="PropImgWrapper" key={i}>
                                <img
                                    onClick={() => handleOpen(i)}
                                    src={photo}
                                    alt=""
                                    className="PropImg"
                                />
                              </div>
                      ))}
                      {photos?.length > 6 && (
                          <div className="ExtraImagesCounter">
                            <span className="ExtraImagesCounterText">+{photos.length - 6} Photos</span>
                          </div>
                      )}
                    </div>
                    <div className="PropDetails">
                      <div className="PropDetailsTexts">
                        <h1 className="PropTitle">Stay in the heart of {location.city ?? ""} City</h1>
                        <p className="PropDesc">
                          {property.description}
                        </p>
                        <div className="PropDetailsExtra">
                          <div className="PropDetailsWrapper">
                            <div className="PropIcons">
                              {
                                property.amenities.map((amenity, index) => (
                                    <div className="iconWithText" key={index}>
                                      <span className="material-symbols-outlined">{amenity.icon}</span>
                                      <span>{amenity.name}</span>
                                    </div>
                                ))
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                  {/*    <div className="PropDetailsPrice">*/}
                  {/*      <h1>Get what you need</h1>*/}
                  {/*      <span>*/}
                  {/*  Located at the real heart of Juja City Mall, this property has an*/}
                  {/*  excellent location score of 9.8!*/}
                  {/*</span>*/}
                  {/*      <h1>Perfect for a family stay!</h1>*/}
                  {/*      <span>*/}
                  {/*  Top Location: Highly rated by recent guests (8.7/10).*/}
                  {/*</span>*/}
                  {/*      <div className="date">*/}
                  {/*        <DateTimePicker/>*/}
                  {/*      </div>*/}
                  {/*      <button>Reserve or Book Now!</button>*/}
                  {/*    </div>*/}
                    </div>
                  </div>
                  <div className="propInfo">
                    <PropertyHeader/>
                    <div className="flex-container">
                      {
                        property.units && property.units.map((unit, index) => (
                            <PropertyListing unit={unit} key={index}/>
                        ))
                      }
                    </div>
                  </div>
                  {/* <Footer /> */}
                </div>
              </div>
          }
    </div>
    }
  </>
  );
};

export default PropertyEditPage;
