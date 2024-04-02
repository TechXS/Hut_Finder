import { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import './carouseledit.css';
import { useDeleteUnitImageMutation } from '../../stores/landlordApi';



const Carousel = ({ images, id }) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [photos, setPhotos] = useState(images);
  console.log('Photos\n', photos)
  const [
    deleteImage, {
      data: deletedImageData,
      error: deletedImageError,
      isLoading: deletedImageIsLoading,
      isSuccess: deletedImageIsSuccess,
    }] = useDeleteUnitImageMutation();

  const handlePrevClick = () => {
    setCurrentIndex(currentIndex === 0 ? photos.length - 1 : currentIndex - 1);

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
      console.log('deleted unit image\n', deletedImage)
    }
  };

  const handleNextClick = () => {
    setCurrentIndex(currentIndex === photos.length - 1 ? 0 : currentIndex + 1);

  };

  return (
    <div className="carousel">
      <div className="carousel-images">
        {photos && photos.map((photo, index) => (
            <div key={index}>
              <img
                  src={photo.imageUrl}
                  alt=""
                  className={index === currentIndex ? 'slide' : 'slide-hidden'}
              />
              <IconButton 
                onClick={() => handlePhotoDelete(index)} 
                aria-label="delete" 
                size="large"
                className={index === currentIndex ? 'slide' : 'slide-hidden'}
                >
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
        {photos && photos.map((_, index) => (
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
