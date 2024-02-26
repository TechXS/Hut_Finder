
const Client = require('../models/clientModel');

const addToWishList = async (req, res) => {
  try {
    const { clientId, propertyId } = req.params;

    // Load the client 
    const client = await Client.findById(clientId);

    if (!client) {
      return res.status(404).json({ error: 'Client not found.' });
    }

    // Use the addToWishList method to add the property to the wishlist
    const result = await client.addToWishList(propertyId);

    if (result.success) {
      res.status(200).json({ message: result.message });
    } else {
      res.status(400).json({ error: result.message });
    }
  } catch (error) {
    console.error('Error adding property to wishlist:', error);
    res.status(500).json({ error: 'Failed to add property to wishlist.' });
  }
};

module.exports = { addToWishList };
