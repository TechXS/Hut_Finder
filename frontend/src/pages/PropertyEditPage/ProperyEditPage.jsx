import "./PropertEditPage.css";
import Navbar from "../../components/NavBar/NavBar";
import PropertyListing from "../../components/PropertyListing/PropertyListing"
import PropertyHeader from "../../components/PropertyHeader/PropertyHeader"
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
import { pimageDta, uimageDta } from "../../utils/formValidation.js";
import { 
  useGetPropertiesQuery,
  useGetPropertyQuery, 
  useGetAllAmenitiesQuery,
  useUpdatePropertyMutation,
  useUpdateUnitMutation,
  useDeleteImageMutation,
  useUploadImageMutation,
  useUploadUnitImageMutation
} from "../../stores/landlordApi";
// import { selectCurrentProperty } from "../../stores/propertySlice";


const PropertyEditPage = () => { 

  const landlord = useSelector(selectCurrentLandlord)
  // console.log('landlord', landlord)
  // const currentProperty = useSelector(selectCurrentProperty)
  // console.log('currentProperty', currentProperty)
  const dispatch = useDispatch();
  const landlord_id = landlord._id;
  // console.log('landlord_id', landlord_id)
  const id = useParams().id
  // const id = currentProperty._id;
  // console.log('id', id) 
  // console.log('current property id', currentProperty._id)
  const [Loading, setLoading] = useState(false);
  const { data: properties, isError, isLoading: propertiesLoading, error: propertiesError } = useGetPropertiesQuery(landlord_id);
  // console.log('id1', id, 'id2', landlord_id)
  const { data: property, isError: propertyError , isLoading: propertyLoading, error: fetchError } = useGetPropertyQuery({id: landlord_id, property_id: id});
  // console.log('properties\n', properties)
  const { data: all_amenities, error: amenitiesError, isLoading: amenitiesLoading } = useGetAllAmenitiesQuery();
  // console.log('all_amenities\n', all_amenities)
  if (amenitiesError){
    console.error(amenitiesError)
  } 
  const [addedAmenities, setAddedAmenities] = useState([]);
  const [location,setLocation] = useState({});
  const {success, error, isLoading} = useSelector(notification);
  // const {id, layout} = useParams();
  const [slideNumber, setSlideNumber] = useState(0);
  const [clicked,  setclicked] = useState(false)
  const [open, setOpen] = useState(false);
  const imageUploadRef1 = useRef();
  const unitUploadRef1 = useRef();
  const [photos, setPhotos] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [editedUnitDets, setEditedUnitDets] = useState([]);
  const [pIMages, setPImages] = useState([]);
  const [uImages, setUImages] = useState([]);
  const [submitImage, setsubmitImage] = useState(false)
  const [
    updateProperty, {
      data: updated_property, 
      error: updatePropertyError, 
      isLoading: updatePropertyLoading,
      isError: updatePropertyIsError
    }] = useUpdatePropertyMutation();
  const [
    updateUnit, {
      data: updated_unit, 
      error: updateUnitError, 
      isLoading: updateUnitLoading,
      isError: updateUnitIsError
    }] = useUpdateUnitMutation();
  const [
    deleteImage, {
      data: deleted_image, 
      error: deleteImageError, 
      isLoading: deleteImageLoading,
      isError: deleteImageIsError
    }] = useDeleteImageMutation();
    const [
      uploadImage, {
        data: uploaded_image, 
        error: uploadImageError, 
        isLoading: uploadImageLoading,
        isError: uploadImageIsError
      }] = useUploadImageMutation();
    const [
      uploadUnitImage, {
        data: uploaded_unit_image,  
        error: uploadUnitImageError,
        isLoading: uploadUnitImageLoading,
        isError: uploadUnitImageIsError
      }] = useUploadUnitImageMutation();

  const frmData = async (data) => {
    setFormData(data);
  }
  const updatedUnit = async (unit) => {
    setEditedUnitDets((prev) => [...prev, unit]);
  }
  const addedAmenitiesHandler = async (amenity) => {
    setAddedAmenities(amenity);
  }
  const updatePropertyPhotos = async (photo) => {
    setPImages(photo);
  }
  const updateUnitPhotos = async (photo) => {
    setUImages([...uImages, photo]);
    // setUImages(photo);
  }

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
  // console.log('property\n', property)


  const [formData, setFormData] = useState({}) 

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handlePhotoDelete = async (index) => {
    if (index >= 0 && photos.length > index) {
      const updatedPhotos = photos.filter((_, i) => i !== index);
      setPhotos(updatedPhotos);
      const deletedPhotoId = photos[index].publicId;
      console.log('deleted photo id\n', deletedPhotoId)
      const deletedImage = await deleteImage({
        id: id, 
        payload: {data: deletedPhotoId}
      }).unwrap();
      console.log('deleted image\n', deletedImage)
    }
  };

  const handleAmenitiesDelete = (index) => {
    if (index >= 0 && amenities.length > index) {
      const updatedAmenities = amenities.filter((_, i) => i !== index);
      console.log(updatedAmenities)
      setAmenities(updatedAmenities);
      console.log('updated amenities\n', updatedAmenities)
      setFormData({...formData, updated_amenities: updatedAmenities})
      console.log('form data\n', formData)

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

  useEffect(() => {
    (async () => {
      console.log('useeeaddedAmenities\n', addedAmenities)
      await frmData({...formData, amenities: addedAmenities})
      console.log('useeefrmDATTTTAA\n', formData)
      // if (formData.amenities){
      //   console.log('1addedAmenities\n', addedAmenities)
      //   // setFormData({...formData, amenities: [...formData.amenities, addedAmenities]})
      //   await frmData({...formData, amenities: [...formData.amenities, addedAmenities]})
      //   console.log('11frmDATTTTAA\n', formData)
      // } else {
      //   console.log('2222addedAmenities\n', addedAmenities)
      //   await frmData({...formData, amenities: addedAmenities})
      //   // setFormData({...formData, amenities: addedAmenities})
      //   console.log('22frmDATTTTAA\n', formData)
      // }
    })()
}, [addedAmenities]);

useEffect(() => {
  (async () => {
    console.log('edited units\n', editedUnitDets)
  })()
}, [editedUnitDets]);
useEffect(() => {
  (async () => {
    console.log('edited unit photos\n', uImages)
  })()
}, [uImages]);


useEffect(()=> {
  (async () => {
    // const pImageData = new FormData();
    // pIMages.forEach((image) => {
    //   pImageData.append("new_pImages", image, image.name);
    // });
  if(submitImage && pIMages.length > 0){  
    try {  
      console.log('pIMages\n', pIMages)
      const pImageData = await pimageDta(pIMages);
      const uploadedImages = await uploadImage({
        id: id,
        payload: pImageData
      }).unwrap()
      console.log('uploadedImages\n', uploadedImages)
      setsubmitImage(false)
    } catch (e){
      console.error(e)
      setsubmitImage(false)
    }
  }
  }) ()
}, [pIMages, submitImage])

useEffect(()=> {
  (async () => {
    // const pImageData = new FormData();
    // pIMages.forEach((image) => {
    //   pImageData.append("new_pImages", image, image.name);
    // });
  if(submitImage && uImages.length > 0){  
    try {  
      console.log('uIMages\n', uImages)
      const uImageData = await uimageDta(uImages);
      for (var pair of uImageData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]+ ', ' + pair[2]);
      }
      // uImageData.forEach((image) => {
      //   console.log('image id\n', image[2])
      // })
      console.log('uImageData\n', uImageData)
      const uploadedUnitImages = await uploadUnitImage({
        payload: uImageData
      }).unwrap()
      console.log('uploadedImages\n', uploadedUnitImages)
      setsubmitImage(false)
    //   const unitImages = await Promise.all(uImages.map(async (imageObj) => {
    //     console.log('submitUnitImage', imageObj)
    //     const uImageData = await uimageDta(imageObj);
    //     const uploadedUnitImage = await uploadUnitImage({
    //         id: imageObj.id,
    //         payload: uImageData
    //     }).unwrap();
    //     console.log('updated unit\n', uploadedUnitImage);
    //     return uploadedUnitImage;
    // }));
    // console.log('unit images\n', unitImages);
    // setsubmitImage(false)
    } catch (e){
      console.error(e)
      setsubmitImage(false)
    }
  }
  }) ()
}, [uImages, submitImage])

  const handleSubmit = async (e) => {
    e.preventDefault();
    imageUploadRef1.current.submitForm();
    setsubmitImage(true)
    console.log('addedAmenities\n', addedAmenities)
    //send form data images and other object  to the database
    // const unitUpdates = editedUnitDets.forEach(async (unit) => {
    //   const updatedUnit = await updateUnit({
    //     id: unit._id, 
    //     payload: unit}).unwrap();
    //   console.log('updated unit\n', updatedUnit)
    // })
    console.log('edited unit details\n', editedUnitDets)
    if (editedUnitDets.length > 0){
      const unitUpdates = await Promise.all(editedUnitDets.map(async (unit) => {
        console.log('submitUnit', unit)
        const updatedUnit = await updateUnit({
            id: unit._id,
            payload: {data: unit}
        }).unwrap();
        console.log('updated unit\n', updatedUnit);
        return updatedUnit;
    }));
      console.log('unit updates\n', unitUpdates)
    }
  //   const unitUpdates = await Promise.all(editedUnitDets.map(async (unit) => {
  //     console.log('submitUnit', unit)
  //     const updatedUnit = await updateUnit({
  //         id: unit._id,
  //         payload: {data: unit}
  //     }).unwrap();
  //     console.log('updated unit\n', updatedUnit);
  //     return updatedUnit;
  // }));
  //   console.log('unit updates\n', unitUpdates)  
    console.log('form data edit page\n', formData)

    if (formData){
      const updatedProperty = await updateProperty({
        id: id, 
        payload: {data: formData}
      }).unwrap();
      console.log('updated property\n', updatedProperty)
    }

    // const propertyUpdates = await updateProperty({
    //   id: id, 
    // payload: {data: formData}
    // }).unwrap();
    // console.log('property updates\n', propertyUpdates)
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
                        name="name"
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
                    <Imageupload ref={imageUploadRef1} updatePropertyPhotos={updatePropertyPhotos}/>
                    <div className="PropImages">
                      {photos.slice(0, 6).map((photo, i) => (
                          <div className="PropImgWrapper" key={i}>
                            <img
                                onClick={() => handleOpen(i)}
                                src={photo.imageUrl}
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
                            name='description'
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
                              {amenities.map(
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

                              <AddAmenities ref={imageUploadRef1} handleSubmit={handleSubmit} amenities={all_amenities} addedAmenitiesHandler={addedAmenitiesHandler}/>
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
                      {
                        property.units && property.units.map((unit, index) => (
                            <ListingItemEdit ref={unitUploadRef1} unit={unit} key={index} updatedUnit={updatedUnit} updateUnitPhotos={updateUnitPhotos}/>
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
                          <img src={photos[slideNumber].imageUrl} alt="" className="sliderImg"/>
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
                                    src={photo.imageUrl}
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
