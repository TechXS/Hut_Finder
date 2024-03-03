import "./searchItem.css";
import { Link } from "react-router-dom";
import { selectPropertyData, setPropertyData } from "../../stores/landlordSlice";
import { useGetlPropertiesQuery } from "../../stores/landlordApi";
import { useSelector } from "react-redux";

  
const SearchItem = () => {
  const propertyData = useSelector(selectPropertyData);
  console.log("propData\n", propertyData);
  const { data: properties, error, isLoading } = useGetlPropertiesQuery();
  console.log("Property\n", property);
  const firstProperty = property?.[0];
  console.log("First Property\n", firstProperty);
  console.log("Title\n", firstProperty?.name);
  console.log("Amenities\n", firstProperty?.amenities[0].name);

  
  return (
    <div className="searchItem">
      {}
      <img
        src="https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"
        alt=""
        className="brImg"
      />
      <div className="brDesc">
        <h1 className="brTitle">{firstProperty?.name}</h1>
        <span className="brDistance">500m from Juja City Mall</span>
        <span className="brTaxiOp">{firstProperty?.amenities[0].name}</span>
        <span className="brSubtitle">
          {firstProperty?.description}
        </span>
        <span className="brFeatures">
          {firstProperty?.units[0].name} • {firstProperty?.units[1].name}
        </span>
        <span className="brCancelOp">
          {firstProperty?.amenities[2].name} 
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
    </div>
  );
};
export default SearchItem;      
