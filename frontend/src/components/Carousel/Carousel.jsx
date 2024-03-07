import { useState } from 'react';
import './carousel.css';

const Carousel = ({ data }) => {
// console.log('Data received by Carousel:', data); 

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex(currentIndex === 0 ? data.length - 1 : currentIndex - 1);

  };

  const handleNextClick = () => {
    setCurrentIndex(currentIndex === data.length - 1 ? 0 : currentIndex + 1);

  };

  return (
    <div className="carousel">
      <div className="carousel-images">
        {data && data.map((item, index) => (
          <img
            key={index}
            src={item.src}
            alt={item.alt}
            className={index === currentIndex ? 'slide' : 'slide-hidden'}
          />
        ))}
      </div>
      <button className="prev" onClick={handlePrevClick}>
        &#10094;
      </button>
      <button className="next" onClick={handleNextClick}>
        &#10095;
      </button>
      <div className="indicators">
        {data && data.map((_, index) => (
          <span
            key={index}
            className={index === currentIndex ? 'active' : ''}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
