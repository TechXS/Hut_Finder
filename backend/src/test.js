const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Define a route to handle data sending
app.post('/send-data', async (req, res) => {
    try {
        // Define the data to send to the model
        const dataToSend = {
            'userid': '660741527b75ee981ccddc06',
            'Wifi': 4,
            'Security': 3,
            'Garden': 5,
            'Washrooms': 2
        };
        
        // Define the URL of your deployed model endpoint
        // const endpointUrl = 'https://recommendation-iamjt.southafricanorth.inference.ml.azure.com/score';
        const endpointUrl = 'http://127.0.0.1:5000/score'

        // Make a POST request to the model endpoint
        const response = await axios.post(endpointUrl, dataToSend);

        // Send the model's response back to the client
        res.json(response.data);
    } catch (error) {
        // Handle errors
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
