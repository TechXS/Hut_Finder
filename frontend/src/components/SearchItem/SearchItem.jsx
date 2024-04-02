import React,{useState,useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import "./searchItem.css";
import { Link } from "react-router-dom";
import {useNavigate, useParams} from "react-router-dom";
import {properties, unitTypes} from "../../utils/dataUtil.js";
import { useAddToWishListMutation, useRemoveFromWishlistMutation } from "../../stores/clientApi.js";
import { useGetWishlistPropertiesQuery } from "../../stores/clientApi.js";
import {selectCurrentClient} from "../../stores/clientSlice.js";
import {
  selectCurrentLandlord,
  setLandlordData,
} from "../../stores/landlordSlice.js";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';


const SearchItem = ({ properties }) => {
  const client = useSelector(selectCurrentClient);
  const landlord = useSelector(selectCurrentLandlord);
  const navigate = useNavigate();
  const { data: wishlistProperties } = useGetWishlistPropertiesQuery(client._id);
  // const[inwishlist,setInwishlist]=useState(false)
  // const AddWish= ()=>{
  
  //   setInwishlist(!inwishlist)
  // }
  const [addToWishlist] = useAddToWishListMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();
  const [bookmarkedProperties, setBookmarkedProperties] = useState([]);

  useEffect(() => {
    if (wishlistProperties) {
      const wishlistIds = wishlistProperties.map(property => property._id);
      setBookmarkedProperties(wishlistIds);
    }
  }, [wishlistProperties]);

  const toggleBookmark = async (propertyId) => {
    if (client._id || landlord._id) {
      try {
        if (bookmarkedProperties.includes(propertyId)) {
          await removeFromWishlist({ id: client._id, property_id: propertyId });
          setBookmarkedProperties(bookmarkedProperties.filter(id => id !== propertyId));
        } else {
          await addToWishlist({ id: client._id, property_id: propertyId });
          setBookmarkedProperties([...bookmarkedProperties, propertyId]);
        }
      } catch (error) {
        console.error("Error toggling bookmark:", error);
        // Handle error if necessary
      }
      window.location.reload(); // Reload the page after adding or removing from wishlist
    } else {
      return navigate("/auth/signin/client");
    }
  }
  

  const isBookmarked = (propertyId) => {
    return bookmarkedProperties.includes(propertyId);
  };
  // const dispatch = useDispatch();
  // const handleClick = (property) => {
  //   dispatch(setCurrentProperty(property));
  //   console.log("Propertyclickkkk\n", property);
  console.log('Properties:', properties);
  
  // }
  const defaultImage ="https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"
  return (
    <>
      {properties && properties.map((property) => (
        <div className="searchItem" key={property._id}>
            <img
              src={(property.images && property.images.length > 0 && property.images[0].imageUrl) || defaultImage}
              // src={property.images[0] ?? defaultImage}
              alt=""
              className="brImg"
            />
            
            <div className="brDesc">
            <h1 className="brTitle">{property.name || ''}</h1>
            <span className="brDistance">{property.location.city && property.location.country ? `${property.location.city}, ${property.location.country}` : property.location.city ?? property.location.country ?? property.location.continent ?? property.location.formatted}</span>
            
            <span className="brTaxiOp">{(property?.amenities && property.amenities.length > 0 && property.amenities[0]?.name) ?? ""}</span>
            
            <span className="brSubtitle">
              {property.description}
            </span>
            <span  className="brFeatures">
            {/* {
              property.units.map((unit, index) => (
                <span  className="brFeatures" key={unit._id}>
                  {unitTypes[unit.type].type} {" "}
                  {index < property.units.length - 1 && ' • '}  {" "}
                </span>
              ))
            } */}
            {property.units && property.units.length > 0 && property.units.map((unit, index) => (
                <span  className="brFeatures" key={unit._id}>
                  {unit.type && unitTypes[unit.type] && unitTypes[unit.type].type}{" "}
                  {index < property.units.length - 1 && ' • '}
                </span>
              ))}
            </span>
            <span className="brCancelOp">
              {/* {(property.amenities[0]?.name || property.amenities[1]?.name) ?? ""} */}
              {(property.amenities && property.amenities.length > 0 && (property.amenities[0]?.name || property.amenities[1]?.name)) ?? ""}

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
            <span onClick={() => toggleBookmark(property._id)}>
              {/* {inwishlist ? <BookmarkIcon/>:<BookmarkBorderIcon/>}*/}
              {isBookmarked(property._id) ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              </span> 
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