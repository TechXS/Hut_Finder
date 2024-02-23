const {model, Schema} = require("mongoose");

const tokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600,// this is the expiry time in seconds
    },
    role: {
        type: String,
        required: true,
    }
});
module.exports = model("token", tokenSchema);