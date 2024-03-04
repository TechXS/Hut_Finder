const {model, Schema} = require("mongoose");

const amenitySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            required: true,
        },
    },
    {timestamps: true}
);

module.exports = model("amenity", amenitySchema);
