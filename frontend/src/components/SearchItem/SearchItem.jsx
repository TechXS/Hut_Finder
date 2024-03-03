import "./searchItem.css";

import React from 'react';


const SearchItem = ({ item }) => {
  return (
    <div className="searchItem">
      <img src={item.imageUrl} alt="" className="brImg" />
      <div className="brDesc">
        <h1 className="brTitle">{item.title}</h1>
        <span className="brDistance">{item.distance}</span>
        <span className="brTaxiOp">{item.freeWifi}</span>
        <span className="brSubtitle">{item.apartmentDescription}</span>
        <span className="brFeatures">{item.features}</span>
        <span className="brCancelOp">{item.backupGenerator}</span>
        <span className="brCancelOpSubtitle">{item.partyParadise}</span>
      </div>
      <div className="brDetails">
        <div className="brRating">
          <span>{item.ratingLabel}</span>
          <button>{item.rating}</button>
        </div>
        <div className="brDetailTexts">
          <span className="brPrice">{item.price}</span>
          <span className="brTaxOp">{item.taxAndFees}</span>
          <button className="brCheckButton">{item.availabilityButton}</button>
        </div>
      </div>
    </div>
  );
};

const SearchItemList = ({ items }) => {
  return (
    <div>
      {items.map((item, index) => (
        <SearchItem key={index} item={item} />
      ))}
    </div>
  );
};


export default SearchItemList;

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
