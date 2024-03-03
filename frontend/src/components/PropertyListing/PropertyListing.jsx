  import Carousel from '../Carousel/Carousel';
  import './propertyListing.css';
  
  export default function PropertyListing() {
    const listing = {
      _id: '1',
      imageUrls: [
        'https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1',
        'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1',
        'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1',
        'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1',
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
  