  import Carousel from '../Carousel/Carousel';
  import './propertyListing.css';
  import {unitTypes} from "../../utils/dataUtil.js";
  
  export default function PropertyListing({unit}) {

    // console.log('unedited units\n', unit)
  
    // Format image data for the Carousel component
    const carouselData = unit && unit.images && unit.images.map((url) => ({
      src: url,
      alt:  unitTypes[unit.type].type ,
    }));
  
    return (
<>
  { unit &&
      (<div className="listing-card">
            <div className="carousel-wrapper">
              <Carousel data={carouselData}/> {/* Render the Carousel component */}
            </div>
            <div className="listing-details">
              <p className="listing-name">{unitTypes[unit.type].type}</p>
              <p className="listing-type">{unit.type}</p>
              <div className="listing-desc">
                <p className="listing-price">Ksh {unit.price.toLocaleString()}</p>
                <p className="listing-info">Available : {unit.vacancies}</p>
              </div>
              <div className="listing-features">
                {
                  unit?.special_amenities?.map((special_amenity, index) => (
                      <div className="feature">{special_amenity.name}</div>
                  ))
                }
              </div>
            </div>
          </div>
      )
  }</>
    );
  }
  