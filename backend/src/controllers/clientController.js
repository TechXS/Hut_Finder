const Client = require('../models/clientModel')
const {isValidObjectId,Types} = require("mongoose");
const Property = require("../models/propertyModel");
const Appointment = require("../models/appointmentModel");
const Landlord = require('../models/landlordModel');
const mongoose = require('mongoose');
const { uploadToCloudinary, removeFromCloudinary } = require("../services/cloudinary");



const getWishlistProperties = async (req, res) => {
    try {
        const clientId = req.params.clientId;
        const client = await Client.findById(clientId).populate('wishlist');
        
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        res.json(client.wishlist); // Assuming wishlist is an array of property IDs
    } catch (error) {
        console.error('Error fetching wishlist properties:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

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
    const { client_id, property_id } = req.params;

    try {
        if (!isValidObjectId(client_id)) {
            throw Error('Client does not exist');
        } else if (!isValidObjectId(property_id)) {
            throw Error('Property does not exist');
        }

        const result = await Client.findByIdAndUpdate(client_id, {$pull: {wishlist: property_id}},
            {new: true})

        res.json(result);

    } catch (error) {
        res.status(500).json({message: 'Failed to remove from wishlist', error: error.message});
    }
}

// create appointment
// const createAppointment = async (req, res) => {
//     try {
//         const { data } = req.body;
//         const { property, client, landlord, date } = data; // Extract data from request body
//         //const landlord = await Landlord.findOne({ properties: data.property }).select("_id");
//         // Create the appointment using the provided data
//         if (!landlord) {
//             return res.status(404).json({ message: "Landlord not found for the given property" });
//         }

//         //data.landlord = landlord._id;

//         // Ensuring the required data is present in the request body
//         if (!landlord || !property || !client || !date) {
//             return res.status(400).json({ error: 'Missing required fields for appointment creation.' });
//         }

//         // Create the appointment using the provided data
//         //const appointment = await Appointment.create(data);
//         const appointment = await Appointment.create({
//             property,
//             client,
//             landlord,
//             date,
//       });

//         res.status(201).json(appointment);
//     } catch (error) {
//         console.error("Error creating appointment:", error);
//         res.status(500).json({ message: 'Failed to create appointment.' ,error:error.message });
//     }
// };
const createAppointment = async (req, res) => {
    try {
      const { data } = req.body;
      const { property, client, date } = data; // Extract data from request body
  
      // Find the landlords who own the given property
      const landlords = await Landlord.find({ properties: property }).select("_id");
      
      if (!landlords || landlords.length === 0) {
        return res.status(404).json({ message: "No landlords found for the given property" });
      }
  
      // Assume the property has only one landlord for simplicity (modify as needed)
      const landlord = landlords[0]._id;
  
      // Create the appointment using the provided data and the found landlord
      const appointment = await Appointment.create({
        property,
        client,
        landlord,
        date,
      });
  
      res.status(201).json(appointment);
    } catch (error) {
      console.error("Error creating appointment:", error);
      res.status(500).json({ message: "Failed to create appointment.", error: error.message });
    }
  };
  
  
  
// Get all properties
// const getAllProperties = async (req, res) => {
//     const { data } = req.body;
//     let { location } = req.query;

//     location = JSON.parse(location);

//     try {
//         let properties;
//        if (location){
//            properties = await Property.aggregate([
//                {
//                    "$geoNear": {
//                        "near": {
//                            "type": "Point",
//                            "coordinates": [location.longitude, location.latitude]
//                        },
//                        "spherical": true,
//                        "distanceField": "dis"
//                    }
//                },
//                { "$sort": { "dis": 1 } },
//                {
//                    "$lookup": {
//                        "from": "amenities",
//                        "localField": "amenities",
//                        "foreignField": "_id",
//                        "as": "amenities"
//                    }
//                },
//                {
//                    "$lookup": {
//                        "from": "units",
//                        "localField": "units",
//                        "foreignField": "_id",
//                        "as": "units"
//                    }
//                }
//            ]);
//        }else {
//            properties = await Property.find( {})
//             .populate({ path: 'amenities', select: 'name icon' })
//             .populate({ path: 'units', select: 'name vacancies type' });
//        }
//         res.status(200).json(properties);
//     } catch (error) {
//         console.error("Error getting properties:", error);
//         res.status(500).json({ error: 'Failed to retrieve properties.' });
//     }
// };

const getAllProperties = async (req, res) => {
    try {
        let properties;
        let { location } = req.query;

        //Check if location is provided in the query
        if (!location) {
            properties = await Property.find({})
                .populate({ path: 'amenities', select: 'name icon' })
                .populate({ path: 'units', select: 'name vacancies type' });
        } else {
            location = JSON.parse(location);
            properties = await Property.aggregate([
                {
                    "$geoNear": {
                        "near": {
                            "type": "Point",
                            "coordinates": [location.longitude, location.latitude]
                        },
                        "spherical": true,
                        "distanceField": "dis"
                    }
                },
                { "$sort": { "dis": 1 } },
                {
                    "$lookup": {
                        "from": "amenities",
                        "localField": "amenities",
                        "foreignField": "_id",
                        "as": "amenities"
                    }
                },
                {
                    "$lookup": {
                        "from": "units",
                        "localField": "units",
                        "foreignField": "_id",
                        "as": "units"
                    }
                }
            ]);
        }

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

        if (!isValidObjectId(id)) {
            return res.status(400).json({ error: 'Property does not exist' });
        }

        const property = await Property.findById(id)
            .populate({ path: 'amenities', select: 'name icon' })
            .populate({ path: 'units', populate:{path: 'special_amenities', select: 'name icon'} });;

        if (!property) {
            return res.status(404).json({ error: 'Property not found.' });
        }

        res.status(200).json(property);
    } catch (error) {
        console.error("Error getting property by ID:", error);
        res.status(500).json({ message: 'Failed to retrieve property.' ,error:error.message  });
    }
};


// Get all appointments for a specific client
const getAllAppointments =  async(req, res) => {
    
    try {
        const { clientId } = req.params;
        if (!isValidObjectId(clientId)) {
            return res.status(400).json({ error: 'Client does not exist' });
        }
        // Query appointments associated with the client and populate property details
        const appointments = await Appointment.find({ client: clientId })
            .populate('property', 'name landlord')
            .populate('landlord', 'phoneNumber') // Populate landlord details directly
            .select('property date time status') // Select required fields
            .lean(); // Convert to plain JavaScript objects

        // Construct response with required fields
        const populatedAppointments = appointments.map(appointment => ({
            propertyName: appointment.property.name,
            landlordPhoneNumber: appointment.landlord ? appointment.landlord.phoneNumber : 'N/A', // Check if landlord is populated
            date: appointment.date,
            time: appointment.time,
            status: appointment.status,
        }));

        res.status(200).json(populatedAppointments);
    } catch (error) {
        console.error('Error fetching client appointments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    }
    


//update client
const updateClient = (req, res) => {
    const {id} = req.params;
    const { data } = req.body;
    console.log("data", data);

    if (!isValidObjectId(id)) {
        return res.status(400).json({error: "Not Valid Client ID"});
    }

    Client.findOneAndUpdate(
        {_id: id}, 
        {$set: data}, 
        {returnOriginal: false}
        )
        .then((response) => {
            res.status(200).json(response);
            console.log("Client updated successfully", response);
        })
        .catch((err) => {
            res.status(400).json({error: "Error updating client"});
            console.log("Error updating client", err.message);
        })
}

//upload image
const uploadImage = async (req, res) => {
    const { id } = req.params;
    const file = req.file;
    console.log("file", file);

    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: 'Invalid request.' });
    }

    try {
        const result = await uploadToCloudinary(file.path, "hutFinder-profileImages");
        const client = await Client.findByIdAndUpdate(
            id, 
            { publicId: result.public_id, imageUrl: result.url }, 
            { new: true }
        );
        res.status(200).json(client);
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Failed to upload image.' });
    }
}

const deleteImage = async (req, res) => {
    const { id } = req.params;
    const { layout } = req.query;

    if (!isValidObjectId(id) || !layout) {
        return res.status(400).json({ error: 'Invalid request.' });
    }

    try {
        const client = await Client.findById(id);
        const result = await removeFromCloudinary(client.profile_picture, layout);

        if (result) {
            client.profile_picture = '';
            await client.save();
        }

        res.status(200).json(client);
    } catch (error) {
        console.error('Error deleting image:', error);
        res.status(500).json({ error: 'Failed to delete image.' });
    } 
}

const addFavouriteamenity = async (req,res)=>{
    try {
    
        // Extract client ID from the request parameters
        const { clientId } = req.params;
    
        // Extract amenity names from the request body
        const { amenityNames } = req.body;
    
        // Find the client document in the database based on the extracted client ID
        const existingClient = await Client.findById(clientId);
    
        // Append new amenity names to the existing list of amenities associated with the client
        existingClient.Aiamenities.push(...amenityNames);
    
        // Save the updated client document back to the database
        const updatedClient = await existingClient.save();
    
        // Respond with success message and updated client data
        res.status(201).json({ message: 'Amenities added successfully', client: updatedClient });
      } catch (error) {
        // Handle errors
        console.error('Error saving amenities to database:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}


module.exports = {getWishlistProperties,getAllAppointments,addToWishList,removeFromWishlist,createAppointment,getAllProperties,getPropertyById,updateClient,uploadImage,addFavouriteamenity}