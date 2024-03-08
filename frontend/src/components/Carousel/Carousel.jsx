import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import './carousel.css';

const Carousel = ({ data ,editstatus} ) => {
// console.log('Data received by Carousel:', data); 
  const [photos, setPhotos]= useState(data)
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePhotoDelete = (index) => {
    if (index >= 0 && photos.length > index) {
      const updatedPhotos = photos.filter((_, i) => i !== index);
      //photo to be deleted 
      console.log(photos[index])


      setPhotos(updatedPhotos);
    }
  };


  const handlePrevClick = (e) => {
    e.preventDefault();
    setCurrentIndex(currentIndex === 0 ? data.length - 1 : currentIndex - 1);

  };

  const handleNextClick = (e) => {
    e.preventDefault();
    setCurrentIndex(currentIndex === data.length - 1 ? 0 : currentIndex + 1);

  };

  return (
    <div className="carousel">
      <div className="carousel-images">
        {editstatus? photos.map((item, index) => (
          <div key={index} className={index === currentIndex ? 'slide' : 'slide-hidden'}>
            <img
              src={item.src}
              alt={item.alt}
              
            />
            <IconButton  onClick={() => handlePhotoDelete(index)}aria-label="delete" size="large">
            <DeleteIcon fontSize="inherit" />
            </IconButton>
          </div>
          
        )): photos.map((item, index) => (
          <img
            key={index}
            src={item.src}
            alt={item.alt}
            className={index === currentIndex ? 'slide' : 'slide-hidden'}
          />))}
      </div>
      <button className="prev" onClick={handlePrevClick}>
        &#10094;
      </button>
      <button className="next" onClick={handleNextClick}>
        &#10095;
      </button>
      <div className="indicators">
        {data.map((_, index) => (
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
