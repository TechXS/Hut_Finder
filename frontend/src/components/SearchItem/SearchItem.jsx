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
          Spacious Apartment with Air conditioning
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



// import "./searchItem.css";

// const SearchItem = ({ retrievedItems }) => {
//   return (
//     <>
//       {retrievedItems.map((item, index) => (
//         <div key={index} className="searchItem">
//           <img src={item.imageUrl} alt="" className="brImg" />
//           <div className="brDesc">
//             <h1 className="brTitle">{item.title}</h1>
//             <span className="brDistance">{item.distance}</span>
//             <span className="brTaxiOp">{item.taxiOption}</span>
//             <span className="brSubtitle">{item.subtitle}</span>
//             <span className="brFeatures">{item.features}</span>
//             <span className="brCancelOp">{item.cancelOption}</span>
//             <span className="brCancelOpSubtitle">{item.cancelOptionSubtitle}</span>
//           </div>
//           <div className="brDetails">
//             <div className="brRating">
//               <span>{item.ratingLabel}</span>
//               <button>{item.ratingValue}</button>
//             </div>
//             <div className="brDetailTexts">
//               <span className="brPrice">{item.price}</span>
//               <span className="brTaxOp">{item.taxOption}</span>
//               <button className="brCheckButton">{item.availabilityButton}</button>
//             </div>
//           </div>
//         </div>
//       ))}
//     </>
//   );
// };

// export default SearchItem;
