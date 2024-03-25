import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import './carouseledit.css';



const Carousel = ({ data }) => {
// console.log('Data received by Carousel:', data); 


  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex(currentIndex === 0 ? data.length - 1 : currentIndex - 1);

  };

  const handlePhotoDelete = async (index) => {
    if (index >= 0 && photos.length > index) {
      const updatedPhotos = photos.filter((_, i) => i !== index);
      setPhotos(updatedPhotos);
      const deletedPhotoId = photos[index].publicId;
      console.log('deleted photo id\n', deletedPhotoId)
      const deletedImage = await deleteImage({
        id: id, 
        payload: {data: deletedPhotoId}
      }).unwrap();
      console.log('deleted image\n', deletedImage)
    }
  };

  const handleNextClick = () => {
    setCurrentIndex(currentIndex === data.length - 1 ? 0 : currentIndex + 1);

  };

  return (
    <div className="carousel">
      <div className="carousel-images">
        {data && data.map((item, index) => (
          <div >
            <img
            key={index}
            src={item.src}
            alt={item.alt}
            className={index === currentIndex ? 'slide' : 'slide-hidden'}
          />
          
          <IconButton  
          className={index === currentIndex ? 'slide' : 'slide-hidden'}
          onClick={() => handlePhotoDelete(index)} aria-label="delete" size="large">
            <DeleteIcon fontSize="inherit"/>
            </IconButton>
            </div>
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
