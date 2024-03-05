const Property = require('../models/propertyModel');
const Landlord = require('../models/landlordModel')
const Appointment = require('../models/appointmentModel')
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

//Get Landlord Data
const getLandlordData = async (req, res) => {
    const {id} = req.params;
    try {
        if (!isValidObjectId(id)) {
            return res.status(404).json({
                message: 'Landlord does not exist',
                error: "Not Valid ID"
            });
        }

        const landlord = await Landlord.findById(id)
            .populate({path: "properties", populate: {path: "amenities units"}})
            // .populate({path: "appointments", populate: {path: "amenities units"}})


        res.json( landlord);
    } catch (error) {
        res.status(500).json({message: 'Could not retrieve landlord data', error: error.message});

    }
};
// Get one Property
const getSpecificProperty = async (req, res) => {
    const {id} = req.params;
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
                path: "units",
                select: "name type price vacancies",
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


module.exports = { getLandlordData ,getSpecificProperty, getAllProperties, createLandlord, getAllAppointments}
