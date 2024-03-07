import "./searchItem.css";
import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setCurrentProperty } from "../../stores/propertySlice";

   
const SearchItem = ({ properties }) => {  
  // const dispatch = useDispatch();
  // const handleClick = (property) => {
  //   dispatch(setCurrentProperty(property));
  //   console.log("Propertyclickkkk\n", property);
  // }
  return (
    <>
      {properties && properties.map((property) => (
        <div className="searchItem" key={property._id}>
            <img
              src="https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"
              alt=""
              className="brImg"
            />
            <div className="brDesc">
            <h1 className="brTitle">{property.name || ''}</h1>
            <span className="brDistance">500m from Juja City Mall</span>
            <span className="brTaxiOp">{property?.amenities[0]?.name ?? ""}</span>
            <span className="brSubtitle">
              {property.description}
            </span>
            <span  className="brFeatures">
            {
              property.units.map((unit, index) => (
                <span  className="brFeatures" key={unit._id}>
                  {unit.type} {" "}
                  {index < property.units.length - 1 && ' • '}  {" "}
                </span>
              ))
            }
            </span>
            <span className="brCancelOp">
              {(property.amenities[0]?.name || property.amenities[1]?.name) ?? ""}
              {/* {(property.amenities[0?.name ? property.amenities[0]?.name : ""])} */}
            </span>
            <span className="brCancelOpSubtitle">
              Join us today, your private party paradise awaits!!!
            </span>
          </div>
        <div className="brDetails">
          <div className="brRating">
            <span>Excellent</span>
            <a>8.9</a>
          </div>
          <div className="brDetailTexts">
            {/*<span className="brPrice">$112</span>*/}
            {/*<span className="brTaxOp">Includes taxes and fees</span>*/}
            <Link to={`/properties/${property._id}`}>
              <button className="brCheckButton">See availability</button>
            </Link>
          </div>
         </div>
      </div>
      ))
      }
    </>
  );
};
export default SearchItem;      
