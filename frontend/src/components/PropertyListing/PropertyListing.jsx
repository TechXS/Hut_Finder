  import Carousel from '../Carousel/Carousel';
  import './propertyListing.css';
  
  export default function PropertyListing() {
    const listing = {
      _id: '1',
      imageUrls: [
        'images/unit4.jpg',
        'images/unit2.jpg',
        'images/unit3.jpg',
        'images/unit1.jpg',
      ],
      name: 'Spacious House with a Balcony',
      offer: true,
      price: '$1500',
      info: 'Available: 10',
      type: '3 bedroom',
      bedrooms: '3 bedroom - House',
      view: 'Ocean View',
      floor: 'Tiled floors',
      internet: 'Free wifi',
      water: '24hr water flow',
      electricity: 'Tokens(Power)',
    };
  
    // Format image data for the Carousel component
    const carouselData = listing.imageUrls.map((imageUrl) => ({
      src: imageUrl,
      alt: listing.name,
    }));
  
    return (
      <div className="listing-card">
        <div className="carousel-wrapper">
          <Carousel data={carouselData} /> {/* Render the Carousel component */}
        </div>
        <div className="listing-details">
          <p className="listing-name">{listing.name}</p>
          <p className="listing-type">{listing.bedrooms}</p>
          <div className="listing-desc">
            <p className="listing-price">{listing.price}</p>
            <p className="listing-info">{listing.info}</p>
          </div>
          <div className="listing-features">
            <div className="feature">{listing.view}</div>
            <div className="feature">{listing.floor}</div>
            <div className="feature">{listing.internet}</div>
            <div className="feature">{listing.water}</div>
            <div className="feature">{listing.electricity}</div>
          </div>
        </div>
      </div>
    );
  }
  