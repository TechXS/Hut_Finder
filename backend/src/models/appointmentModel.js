// appointmentModel.js
const { model, Schema } = require('mongoose');

const appointmentSchema = new Schema(
  {
    landlord: {
      type: Schema.Types.ObjectId,
      ref: 'Landlord',
      required: true,
    }, 
    property: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: 'Client',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    purpose: {
      type: String,
      default: 'view property',
    },
    
  },
  { timestamps: true }
);

const Appointment = model('Appointment', appointmentSchema);

module.exports = Appointment;
