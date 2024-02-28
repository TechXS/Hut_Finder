import React, { useState, useEffect } from 'react';
import Home from "../pages/Home.jsx";

const LandingLayout = () => {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
    
    useEffect(() => {
      // Call getLocation when the component mounts
      getLocation();
    }, []);
    
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setLocation({ latitude, longitude });
    
            // Send coordinates to the backend
            sendCoordinatesToBackend({ latitude, longitude });
          },
          (error) => {
            setError(`Error: ${error.message}`);
          }
        );
      } else {
        setError('Geolocation is not supported by this browser.');
      }
    };
    
    const sendCoordinatesToBackend = (coordinates) => {
      // Replace 'YOUR_BACKEND_API_ENDPOINT' with your actual backend API endpoint
      fetch('YOUR_BACKEND_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(coordinates),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Coordinates sent to backend successfully:', data);
        })
        .catch(error => {
          console.error('Error sending coordinates to backend:', error);
        });
    };
    
    return (
        <>
            
            <Home/>
            <div>
      {/* {location && (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      )} */}

      {error && <p>{error}</p>}
    </div>
            
        </>

    );
};

export default LandingLayout;
