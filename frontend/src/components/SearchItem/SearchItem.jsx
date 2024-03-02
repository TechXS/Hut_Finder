import "./searchItem.css";
  
const SearchItem = () => {
  return (
    <div className="searchItem">
      <img
        src="https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"
        alt=""
        className="brImg"
      />
      <div className="brDesc">
        <h1 className="brTitle">Cascade plaza</h1>
        <span className="brDistance">500m from Juja City Mall</span>
        <span className="brTaxiOp">Free wifi installation</span>
        <span className="brSubtitle">
          1 bedroom • 2 bedroom • bedsitter • Studio
        </span>
        <span className="brFeatures">
          Laundry area • Underground packing • Rooftop oasis
        </span>
        <span className="brCancelOp">Backup Generator </span>
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
          <button className="brCheckButton">See availability</button>
        </div>
      </div>
    </div>
  );
};
export default SearchItem;      
