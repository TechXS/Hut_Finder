const Client = require('../models/clientModel')
const {isValidObjectId} = require("mongoose");
const Property = require("../models/propertyModel");
const Appointment = require("../models/appointmentModel");


// add to wishlist
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

// remove from wishlist
const removeFromWishlist = async (req, res) => {
    const {id} = req.params
    const {data} = req.body
    try {
        if (!isValidObjectId(id)) {
            throw Error('Client does not exist');
        } else if (!isValidObjectId(data.property_id)) {
            throw Error('Property does not exist');
        }

        const result = await Client.findByIdAndUpdate(id, {$pop: {wishlist: data.property_id}},
            {new: true})

        res.json(result);

    } catch (error) {
        res.status(500).json({message: 'Failed to remove from wishlist', error: error.message});
    }
}

// create appointment
const createAppointment = async (req, res) => {
    try {
        const { data } = req.body;

        // Ensuring the required data is present in the request body
        if (!data.landlord || !data.property || !data.client || !data.date) {
            return res.status(400).json({ error: 'Missing required fields for appointment creation.' });
        }

        // Create the appointment using the provided data
        const appointment = await Appointment.create({
            landlord: data.landlord,
            property: data.property,
            client: data.client,
            date: new Date(data.date),
            purpose: data.purpose || 'view property', // Default to 'view property' if purpose is not provided

        });

        res.status(201).json(appointment);
    } catch (error) {
        console.error("Error creating appointment:", error);
        res.status(500).json({ error: 'Failed to create appointment.' });
    }
};

// Get all properties
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

// Get specific property by ID
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
module.exports = {addToWishList,removeFromWishlist,createAppointment,getAllProperties,getPropertyById}