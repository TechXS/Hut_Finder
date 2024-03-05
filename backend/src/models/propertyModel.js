const {model, Schema} = require("mongoose");

const propertySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        location: {
            type: {
                type: String,
                enum: ['Point'],
                required: true
            },
            coordinates: {
                type: [Number],
                required: true
            },
        },
        images: [
            {
                type: String,

            }
        ],
        amenities: [{
            type: Schema.Types.ObjectId,
            ref: "amenity",
        }],
        description: String,
        units: [{type: Schema.Types.ObjectId, ref: "unit"}],
        show_vacancies: Boolean,
    },
    {timestamps: true}
);

module.exports = model("property", propertySchema);
