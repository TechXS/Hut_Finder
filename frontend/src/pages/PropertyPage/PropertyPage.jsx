import "./propertyPage.css";
import Navbar from "../../components/NavBar/NavBar";
import PropertyListing from "../../components/PropertyListing/PropertyListing"
import PropertyHeader from "../../components/PropertyHeader/PropertyHeader"
import "./propertyPage.css";
import {useEffect, useState} from "react";
import DateTimePicker from "../../components/DateTimePicker/DateTimePicker";
import {useCreateAppointmentMutation, useGetPropertiesQuery, useGetPropertyQuery} from "../../stores/clientApi.js";
import {useNavigate, useParams} from "react-router-dom";
import Footer from "../../components/Footer/Footer.jsx";
import {handleReverseGeocode} from "../../utils/geocode.js";
import {selectAppointmentDate, setSignupError} from "../../stores/clientSlice.js";
import {setForgotPassSuccess} from "../../stores/landlordSlice.js";
import {signUpValidation} from "../../utils/formValidation.js";
import {setErrorNotification} from "../../stores/notificationSlice.js";
import {useSignUpClientMutation} from "../../stores/authApi.js";
import LoadingButton from "@mui/lab/LoadingButton";
import {selectCurrentClient} from "../../stores/clientSlice.js";
import {useDispatch, useSelector} from "react-redux";
import { selectCurrentProperty } from "../../stores/propertySlice";

const PropertyPage = () => {
  const client = useSelector(selectCurrentClient);
  const appointmentDate = useSelector(selectAppointmentDate);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const {id:property_id} = useParams();
  const [location,setLocation] = useState({});
  const { data: property, error, } = useGetPropertyQuery({property_id});
  const [createAppointment, {data: response, isLoading}] = useCreateAppointmentMutation();

  const photos = property?.images
  const amenities = property?.amenities
  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  function extractAmenityNames(amenitiess){
        const amenityNames= [];
        for (const amenity of amenitiess){
          amenityNames.push(amenity.name);
        }
        return amenityNames
  }

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

  const getLocation = async (property)=>{
  try{
    // const currentLocation = JSON.parse(sessionStorage.getItem("location"))
    // console.log(currentLocation)
    //
    // let location  = await handleReverseGeocode(currentLocation.latitude,currentLocation.longitude)

    let location  = await handleReverseGeocode(property.location.coordinates[1],property.location.coordinates[0])
    setLocation(location)
  }catch (e) {
    console.error(e.message)
  }
  }


  useEffect(() => {
    if(property?.location !== undefined){
      getLocation(property)
    }

  }, [property]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        console.log(appointmentDate)
      if (!client._id){return navigate("/auth/signin/client")}

      const formData = {...appointmentDate}
      formData.property = property._id
      formData.client = client._id
      console.log(formData)
      const appointmentData = await createAppointment({id:client._id,payload:{data: formData}}).unwrap();
      // navigate("/auth/signin/client");
      console.log(appointmentData);
    } catch (e) {
      // console.error(e.data.message);
      // dispatch(setSignupError(e.data.message));
      dispatch(setErrorNotification(e?.data?.message ?? e.error));
    }
  };


  const handleAddWish= async ()=>{
    try{

      const amenityNames =extractAmenityNames(amenities)
      console.log(amenityNames)
      const backendEndpoint = `http://localhost:5000/api/client/wishlist/${client._id}/`;
      const requestData = {
        amenityNames: amenityNames
      };
  
      const response = await fetch(backendEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });
  
      // Check if the request was successful
      if (!response.ok) {
        throw new Error('Failed to send amenity names to backend');
      }
  
      // Log the response from the backend
      const responseData = await response.json();
      console.log('Response from backend:', responseData);
    
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error sending amenity names to backend:', error);
    // You can dispatch an error notification or handle the error as needed
  }
  
  }
  return (
    <div>
      <Navbar />
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
              <img src={photos[slideNumber]} alt="" className="sliderImg" />
            </div>
            <span className="arrow" onClick={() => handleMove("r")}>
              <span className="material-symbols-outlined">arrow_circle_right</span>
            </span>
          </div>
        )}
        { property && (
            <>
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
                      console.log('url isss', photo.imageUrl),
                          <div className="PropImgWrapper" key={i}>
                            <img
                                onClick={() => handleOpen(i)}
                                src={photo.imageUrl}
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
                          {/*<div className="iconWithText">*/}
                          {/*  <span className="material-symbols-outlined">local_florist</span>*/}
                          {/*  <span>Garden</span>*/}
                          {/*</div>*/}
                          {/*<div className="iconWithText">*/}
                          {/*  <span className="material-symbols-outlined">wifi</span>*/}
                          {/*  <span>Wifi</span>*/}
                          {/*</div>*/}
                          {/*<div className="iconWithText">*/}
                          {/*  <span className="material-symbols-outlined">bathtub</span>*/}
                          {/*  <span>Washrooms</span>*/}
                          {/*</div>*/}
                          {/*<div className="iconWithText">*/}
                          {/*  <span className="material-symbols-outlined">local_parking</span>*/}
                          {/*  <span>Parking</span>*/}
                          {/*</div>*/}
                          {/*<div className="iconWithText">*/}
                          {/*  <span className="material-symbols-outlined">visibility</span>*/}
                          {/*  <span>View</span>*/}
                          {/*</div>*/}
                          {/*<div className="iconWithText">*/}
                          {/*  <span className="material-symbols-outlined">smoke_free</span>*/}
                          {/*  <span>Smoke Free</span>*/}
                          {/*</div>*/}
                          {/*<div className="iconWithText">*/}
                          {/*  <span className="material-symbols-outlined">fitness_center</span>*/}
                          {/*  <span>Gym</span>*/}
                          {/*</div>*/}
                          {/*<div className="iconWithText">*/}
                          {/*  <span className="material-symbols-outlined">pool</span>*/}
                          {/*  <span>Pool</span>*/}
                          {/*</div>*/}
                          {/*<div className="iconWithText">*/}
                          {/*  <span className="material-symbols-outlined">balcony</span>*/}
                          {/*  <span>Balcony</span>*/}
                          {/*</div>*/}
                        </div>
                      </div>
                    </div>
                  </div>
                  <form  onSubmit={handleSubmit} className="PropDetailsPrice">
                    <h1>Get what you need</h1>
                    <span>
                Located at the real heart of {location.city ?? location.country ?? location.continent}, this property has an
                excellent location score of 9.8!
              </span>
                    <h1>Perfect for a family stay!</h1>
                    <span>
                Top Location: Highly rated by recent guests (8.7/10).
              </span>
                    <div className="date">
                      <DateTimePicker/>
                    </div>
                    <div style={{
                      display:'flex',
                      justifyContent:'center',
                      alignItems:'center',

                    }}>
                    <LoadingButton
                        loading={isLoading}
                        loadingPosition="end"
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2 ,textTransform:"none",marginRight:1}}
                      
                    >
                       Book Now!
                    </LoadingButton>
                    <LoadingButton
                        loading={isLoading}
                        loadingPosition="end"
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2 ,textTransform:"none",marginLeft:1}}
                      onClick={handleAddWish}
                    >
                      Add to Wish
                    </LoadingButton>

                    </div>
                  </form>
                </div>
              </div>
              <div className="propInfo">
                <PropertyHeader/>
                <div className="flex-container">
                  {
                    property.units.map((unit,index)=>(
                        <PropertyListing unit={unit} key={index}/>
                    ))
                  }
                </div>
              </div>
            </>
        )}
        <Footer/>
      </div>
    </div>
  );
};
export default PropertyPage;
