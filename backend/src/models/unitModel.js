const {model, Schema} = require("mongoose");

const unitSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        vacancies: {
            type: Number,
            required: true,
        },

        availability_status: {
            type: String, enum: ["AVAILABLE", "NOT AVAILABLE"],
            default: function () {
                return this.vacancies > 0 ? "AVAILABLE" : "NOT AVAILABLE";
            },
        },
        images: [
            {
                type: String,
            }
        ],
        special_amenities: [{
            type: Schema.Types.ObjectId,
            ref: "amenity",
        }],

    },
    {timestamps: true}
);

module.exports = model("unit", unitSchema);
