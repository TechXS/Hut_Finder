import axios from "axios";

export const handleGeocode = async (address) => {
    return new Promise(async (resolve,reject)=>{
        try {
            const response = await axios.get(
                `https://api.opencagedata.com/geocode/v1/json?q=${address}&key=207d121f6a144cd7b1b049fb9497f409`
            );

            const { results } = response.data;
            if (results.length > 0) {
                const { lat, lng } = results[0].geometry;
                resolve({ latitude: lat, longitude: lng });
            } else {
                reject('Location not found');
            }
        } catch (error) {
            reject('Error fetching geocode data');
        }
    })

};