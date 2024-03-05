const {model, Schema} = require("mongoose");

const reviewSchema = new Schema(
    {
        property: {
            type: Schema.Types.ObjectId,
            ref: "property",
            required: true
        },

        client: {
            type: Schema.Types.ObjectId,
            ref: "client",
            required: true
        },

        description: {
            type: String,
            required: true,
        },
        stars: {
            type: Number,
            required: true,
            default: 0
        }
    },
    {timestamps: true}
);

module.exports = model("review", reviewSchema);
