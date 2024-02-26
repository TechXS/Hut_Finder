// requestController.js
const Property = require("../models/propertyModel");

const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Property ID is missing in the request parameters.' });
    }

    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({ error: 'Property not found.' });
    }

    res.status(200).json(property);
  } catch (error) {
    console.error("Error getting property by ID:", error);
    res.status(500).json({ error: 'Failed to retrieve property.' });
  }
};

module.exports = { getPropertyById };
