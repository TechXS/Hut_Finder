  import Carousel from '../Carousel/Carousel';
  import './propertyListing.css';
  
  export default function PropertyListing({unit}) {
    const listing = {
      _id: '1',
      imageUrls: [
        '../../../../public/images/unit4.jpg',
        '../../../../public/images/unit2.jpg',
        '../../../../public/images/unit3.jpg',
        '../../../../public/images/unit1.jpg',
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
    const carouselData = unit.images.map((url) => ({
      src: url,
      alt: unit.name,
    }));
  
    return (
      <div className="listing-card">
        <div className="carousel-wrapper">
          <Carousel data={carouselData} /> {/* Render the Carousel component */}
        </div>
        <div className="listing-details">
          <p className="listing-name">{unit.name}</p>
          <p className="listing-type">{unit.type}</p>
          <div className="listing-desc">
            <p className="listing-price">Ksh {unit.price.toLocaleString()}</p>
            <p className="listing-info">Available : {unit.vacancies}</p>
          </div>
          <div className="listing-features">
            {
              unit.special_amenities.map((special_amenity,index)=> (
                  <div className="feature">{special_amenity.name}</div>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
  