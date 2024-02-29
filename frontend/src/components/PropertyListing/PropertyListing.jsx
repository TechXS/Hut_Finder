import "./propertyListing.css";
export default function ListingItem() {
  const listing = {
    _id: '1',
    imageUrls: ['https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1'],
    name: 'Spacious House with a Balcony',
    offer: true,
    price: "$1500",
    info: "Available: 10",
    type: '3 bedroom',
    bedrooms: "3 bedrooms",
    view: "Ocean View",
    floor: "Tiled floors",
    internet: "Free wifi",
    water: "24hr water flow",
    electricity: "Tokens(Power)",
  };
  return (
    <div className="listing-card">
      <img
        src={listing.imageUrls[0]}
        alt='listing cover'
      />
      <div className='listing-details'>
        <p className='listing-name'>{listing.name}</p>
        <div className="listing-desc">
          <p className='listing-price'>{listing.price}</p>
          <p className='listing-info'>{listing.info}</p>
        </div>
        <div className='listing-features'>
          <div className='feature'>{listing.bedrooms}</div>
          <div className='feature'>{listing.view}</div>
          <div className='feature'>{listing.floor}</div>
          <div className='feature'>{listing.internet}</div>
          <div className='feature'>{listing.water}</div>
          <div className='feature'>{listing.electricity}</div>
        </div>
      </div>
    </div>
  );
}
