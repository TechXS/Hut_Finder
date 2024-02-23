const {model, Schema} = require("mongoose");

const propertySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        location: {
            type: String,
            required: true,
        },
        images: [
            {
                type: String,

            }
        ],
        amenities: [
            {
                type: String,
            }
        ],
        description: String,
        units: [{type: Schema.Types.ObjectId, ref: "unit"}],
        show_vacancies: Boolean,
    },
    {timestamps: true}
);

module.exports = model("property", propertySchema);
