
// requestController.js
const Property = require("../models/propertyModel");
//const User = require("../models/userModel");

const getAllProperties = async (req, res) => {
  const {data} = req.body;
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    console.error("Error getting properties:", error);
    res.status(500).json({ error: 'Failed to retrieve properties.' });
  }
};




module.exports = { getAllProperties };