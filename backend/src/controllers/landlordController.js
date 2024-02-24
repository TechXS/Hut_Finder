const Property = require('../models/propertyModel');
const Landlord = require('../models/landlordModel')
const {isValidObjectId} = require("mongoose");


//Get all Properties
const getAllProperties = async (req, res) => {
    try {
        const result = await Property.find().populate({path: "units", select: "name type price vacancies",})
            .populate({path: "amenities", select: "name icon"})
        res.json(result);
    } catch (error) {
        res.status(500).json({message: 'Could not get all properties', error: error.message});

    }
};

// Get one Property
const getSpecificProperty = async (req, res) => {
    const {id} = req.params;
    const {location} = req.query();

    console.log(location);

    try {
        if (!isValidObjectId(id)) {
            return res.status(404).json({
                message: 'Property does not exist',
                error: "Not Valid ID"
            });
        }

        const result = await Property.findOne({ _id: id }).where('location').within(location)
            .populate({
                path: "units",
                select: "name type price vacancies",
            })
            .populate({path: "amenities", select: "name icon"})
        res.json(result);
    } catch (error) {
        res.status(500).json({message: 'Could not property', error: error.message});

    }
};

module.exports = {getSpecificProperty, getAllProperties}
