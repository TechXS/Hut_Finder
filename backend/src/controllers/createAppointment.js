

const Appointment = require("../models/appointmentModel");
//const User = require("../models/userModel");

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



module.exports = { createAppointment};