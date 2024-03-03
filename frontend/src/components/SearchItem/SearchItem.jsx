import "./searchItem.css";
import { Link } from "react-router-dom";
import { selectPropertyData, setPropertyData } from "../../stores/landlordSlice";
import { useGetlPropertiesQuery } from "../../stores/landlordApi";
import { useSelector } from "react-redux";

  
const SearchItem = () => {
  const propertyData = useSelector(selectPropertyData);
  console.log("propData\n", propertyData);
  const { data: properties, error, isLoading } = useGetlPropertiesQuery();
  console.log("Property\n", properties);
  const firstProperty = properties?.[0];

  
  return (
    <div className="searchItem">
      {properties && properties.map((property, index) => (
        <>
            <img
              src="https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"
              alt=""
              className="brImg"
            />
            <div className="brDesc" key={property._id}>
            <h1 className="brTitle">{property.name}</h1>
            <span className="brDistance">500m from Juja City Mall</span>
            <span className="brTaxiOp">{property.amenities[0].name}</span>
            <span className="brSubtitle">
              {property.description}
            </span>
            <span className="brFeatures">
              {property.units[0].name} • {property.units[1].name}
            </span>
            <span className="brCancelOp">
              {property.amenities[2].name} 
            </span>
            <span className="brCancelOpSubtitle">
              Join us today, your private party paradise awaits!!!
            </span>
          </div>
        <div className="brDetails">
          <div className="brRating">
            <span>Excellent</span>
            <button>8.9</button>
          </div>
          <div className="brDetailTexts">
            <span className="brPrice">$112</span>
            <span className="brTaxOp">Includes taxes and fees</span>
            <Link to="/property">
              <button className="brCheckButton">See availability</button>
            </Link>       
          </div>
         </div>
      </>
      ))
      }
    </div>
  );
};
export default SearchItem;      
