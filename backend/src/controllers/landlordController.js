const Property = require('../models/propertyModel');
const Landlord = require('../models/landlordModel')
const Appointment = require('../models/appointmentModel')
const Amenity = require('../models/amenityModel')
const Unit = require('../models/unitModel');
const {isValidObjectId} = require("mongoose");
const { response } = require('express');


//Get all Properties
const getAllProperties = async (req, res) => {
    try {
        const result = await Property.find().populate({path: "units"})
            .populate({path: "amenities", select: "name icon"})
        res.json(result);
    } catch (error) {
        res.status(500).json({message: 'Could not get all properties', error: error.message});

    }
};

//Get Landlord Data
const getLandlordData = async (req, res) => {
    const { id } = req.params;
    try {
        if (!isValidObjectId(id)) {
            console.log('NOT AMENITES so i wonder')
            return res.status(404).json({
                message: 'Landlord does not exist peaceeeee',
                error: "Not Valid ID"
            });
        }

        const landlord = await Landlord.findById(id)
            .populate({ path: "properties", populate: { path: "amenities units" } })
            .populate({ path: "appointments", populate: { path: "amenities units" } });

        console.log(id)
        const appointments = await     Appointment.find({ landlord: id })
            .populate({ path: 'property', select: 'name location' })
            .populate({ path: 'client', select: 'name email phoneNumber' });

        // Compute additional attributes
        let totalVacantUnits = 0;
        let totalProperties = 0;
        let totalPendingAppointments = 0;

        landlord.properties.forEach(property => {
            property.units.forEach(unit => {
                if (unit.availability_status === "AVAILABLE") {
                    totalVacantUnits+= unit.vacancies;
                }
            });
        });

        totalProperties = landlord.properties.length;
        totalPendingAppointments = appointments.length;

        // Add computed attributes to landlord object
        const modifiedLandlord = {
            ...landlord.toObject(),
            totalVacantUnits,
            totalProperties,
            totalPendingAppointments,
            appointments:appointments
        };

        res.json(modifiedLandlord);
        console.log("landlord and not amenitiessssssssssssss\n");
    } catch (error) {
        res.status(500).json({ message: 'Could not retrieve landlord data', error: error.message });
    }
};

// const getLandlordData = async (req, res) => {
//     const {id} = req.params;
//     try {
//         if (!isValidObjectId(id)) {
//             return res.status(404).json({
//                 message: 'Landlord does not exist',
//                 error: "Not Valid ID"
//             });
//         }
//
//         const landlord = await Landlord.findById(id)
//             .populate({path: "properties", populate: {path: "amenities units"}})
//             .populate({path: "appointments", populate: {path: "amenities units"}})
//
//
//         res.json( landlord);
//     } catch (error) {
//         res.status(500).json({message: 'Could not retrieve landlord data', error: error.message});
//
//     }
// };
// Get one Property
const getSpecificProperty = async (req, res) => {
    const {id} = req.params;
    console.log("id", id);
    // const {location} = req.query();

    // console.log(location);

    try {
        if (!isValidObjectId(id)) {
            return res.status(404).json({
                message: 'Property does not exist',
                error: "Not Valid ID"
            });
        }

        // const result = await Property.findOne({ _id: id }).where('location').within(location)
        //
        const result = await Property.findOne({ _id: id })
            .populate({
                path: "units"
            })
            .populate({path: "amenities", select: "name icon"})
        res.json(result);
    } catch (error) {
        res.status(500).json({message: 'Could not property', error: error.message});

    }
};
const createLandlord = async (req, res) => {
    const { data } = req.body;
    Landlord.create(data)
        .then((landlord) => {
            res.status(201).json(landlord);
        })
        .catch((error) => {
            res.status(500).json({message: 'Could not create landlord', error: error.message});
        });
};

//get appointments
const getAllAppointments = (req, res) => {
    const { id } = req.params
    console.log("id", id)
    Appointment.find({ landlord: id })
        .populate({ path: 'property', select: 'name location' })
        .populate({ path: 'client', select: 'name email' })
        .then((appointments) => {
            console.log("appointments\n", appointments)
            res.status(200).json({ message: "Appointments fetched successfully\n", appointments });
        })
        .catch((err) => {
            console.log("Error:\n", err.message)
            res.status(400).json({ error: "Error fetching appointments" });
        });
};

//get landlord properties
const getAllLandlordProperties = (req, res) => {
    const { id } = req.params
    console.log('id', id)
    Landlord.findById(id)
    .populate({path: "properties", select: "name location images", populate: {path: "amenities units"}})
    .then((landlord) => {
        const properties = landlord.properties;
        console.log("properties\n", properties)
        res.status(200).json({ message: "Properties fetched successfully\n", properties });
    })
    .catch((err) => {
        console.log("Error:\n", err.message)
        res.status(400).json({ error: "Error fetching properties" });
    });

}
//update landlord
const updateLandlord = (req, res) => {
    const {id} = req.params;
    const { data } = req.body;
    console.log("data", data);

    if (!isValidObjectId(id)) {
        return res.status(400).json({error: "Not Valid Client ID"});
    }

    Landlord.findOneAndUpdate(
        {_id: id}, 
        {$set: data}, 
        {returnOriginal: false}
        )
        .then((response) => {
            res.status(200).json(response);
            console.log("Landlord updated successfully", response);
        })
        .catch((err) => {
            res.status(400).json({error: "Error updating landlord"});
            console.log("Error updating landlord", err.message);
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
        const landLord = await Landlord.findByIdAndUpdate(id, { profile_picture: result.url }, { new: true });
        res.status(200).json(landLord);
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Failed to upload image.' });
    }
}

//get all amenities
const getAllAmenities = async (req, res) => {
    console.log("get all amenities func")
    try {
        const result = await Amenity.find();
        // console.log("result", result);
        const flag = {};
        const uniqueAmenites = result.filter((amenity) => {
            if (!flag[amenity.name]) {
                flag[amenity.name] = true;
                return true;
            }
            return false;
        });
        console.log("uniqueAmenites", uniqueAmenites)
        res.json(uniqueAmenites);
    } catch (error) {
        res.status(500).json({message: 'Could not get all amenities', error: error.message});
        console.log("errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrror\n", error);
    }

}

const updateUnit = async (req, res) => {
    const {id} = req.params;
    const { data } = req.body;
    console.log("data\n", data);

    if (!isValidObjectId(id)) {
        return res.status(400).json({error: "Not Valid Unit ID"});
    }

    Unit.findOneAndUpdate(
        {_id: id},
        {$set: data},
        {returnOriginal: false}
    ).then((response) => {
        res.status(200).json(response);
        console.log('succesin unit update');
    }).catch((err) => {
        res.status(400).json({error: 'Error updating unit'});
        console.log('error in unit update')
    })

}


module.exports = { 
    getLandlordData,
    getSpecificProperty,
    getAllProperties,
    createLandlord,
    getAllAppointments,
    getAllLandlordProperties,
    updateLandlord,
    uploadImage,
    getAllAmenities,
    updateUnit
};
