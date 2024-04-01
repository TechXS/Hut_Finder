// appointmentModel.js
const { model, Schema } = require('mongoose');

const appointmentSchema = new Schema(
  {
    landlord: {
      type: Schema.Types.ObjectId,
      ref: 'landlord',
      required: true,
    }, 
    property: {
      type: Schema.Types.ObjectId,
      ref: 'property',
      required: true,
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: 'client',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'denied'],
      default: 'pending',
    },
    purpose: {
      type: String,
      default: 'view property',
    },
    
  },
  { timestamps: true }
);

const Appointment = model('appointment', appointmentSchema);

module.exports = Appointment;
