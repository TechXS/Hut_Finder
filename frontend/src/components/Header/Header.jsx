import { useState } from 'react';
import "./header.css";
import SearchIcon from '@mui/icons-material/Search';

const Header = () => {
  const [location, setLocation] = useState("location");
  const [property, setProperty] = useState("properties");
  const [unitType, setUnitType] = useState("unitType");
  const [price, setPrice] = useState("price");
  // const search = () => {}

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handlePropertyChange = (event) => {
    setProperty(event.target.value);
  };

  const handleUnitTypeChange = (event) => {
    setUnitType(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleReset = () => {
    setLocation("location");
    setProperty("properties");
    setUnitType("unitType");
    setPrice("price");
  };

  return (
    <div className="header">
      <div className="headerContainer">
        <div className="headerList">
          <div className="headerListItem">
            <select value={location} onChange={handleLocationChange}>
              <option value="location">Location</option>
              <option value="gateA">Gate A</option>
              <option value="gateB">Gate B</option>
              <option value="gateC">Gate C</option>
              <option value="gateD">Gate D</option>
            </select>
          </div>
          <div className="headerListItem">
            <select value={property} onChange={handlePropertyChange}>
              <option value="properties">Properties</option>
              <option value="cascade">Cascade Apartments</option>
              <option value="winimum">Winimum Apartments</option>
              <option value="leGrand">Le Grand Apartments</option>
              <option value="safari">Safari Apartments</option>
            </select>
          </div>
          <div className="headerListItem">
            <select value={unitType} onChange={handleUnitTypeChange}>
              <option value="unitType">Unit Type</option>
              <option value="bedsitter">Bedsitter</option>
              <option value="singleRoom">Single Room</option>
              <option value="oneBedroom">1 Bedroom</option>
              <option value="twoBedroom">2 Bedroom</option>
            </select>
          </div>
          <div className="headerListItem">
            <select value={price} onChange={handlePriceChange}>
              <option value="price">Price</option>
              <option value="2000-5000">2000 - 5000</option>
              <option value="5001-10000">5001 - 10000</option>
              <option value="10001-20000">10001 - 20000</option>
              <option value="20001-30000">20001 - 30000</option>
            </select>
          </div>
          <SearchIcon 
          style={{ alignSelf: 'center' }}
          onClick={() => console.log("searching...")}
          sx={{ cursor: 'pointer' }}
          />          
          <button className="btn" onClick={handleReset}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default Header;