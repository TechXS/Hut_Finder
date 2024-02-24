const {model, Schema} = require("mongoose");

const requestSchema = new Schema(
    {
        landlord: {
            type: Schema.Types.ObjectId,
            ref: "landlord",
            required: true
        },

        client: {
            type: Schema.Types.ObjectId,
            ref: "client",
            required: true
        },

        date_time: {
            type: Date,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },
        request_status: {
            type: String,
            enum: ["ACCEPTED", "PENDING", "REJECTED"],
            default: "PENDING",
        },
    },
    {timestamps: true}
);

module.exports = model("request", requestSchema);
