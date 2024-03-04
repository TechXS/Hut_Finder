import "./propertyPage.css";
import Navbar from "../../components/NavBar/NavBar";
import PropertyListing from "../../components/PropertyListing/PropertyListing"
import PropertyHeader from "../../components/PropertyHeader/PropertyHeader"
import "./propertyPage.css";
import { useState } from "react";
import DateTimePicker from "../../components/DateTimePicker/DateTimePicker";

const PropertyPage = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);

  const photos = [
    {
      src: "images/property3.jpg",
    }, 
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
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
    }, 
    {
      src: "../../../public/images/property3.jpg",
    }, 
  ];

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
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
   );
 };
 export default PropertyPage;
