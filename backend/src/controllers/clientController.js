const Client = require('../models/clientModel')
const {isValidObjectId} = require("mongoose");
const Property = require("../models/propertyModel");

// remove from wishlist
const removeFromWishlist = async (req, res) => {
    const {id} = req.params
    const {data} = req.body
    try {
        if (!isValidObjectId(id)) {
            throw Error('Client does not exist');
        } else if (!isValidObjectId(data.property_id)) {
            throw Error('Property does not exist');
        }

        const result = await Client.findByIdAndUpdate(id, {$pop: {wishlist: data.property_id}},
            {new: true})

        res.json(result);

    } catch (error) {
        res.status(500).json({message: 'Failed to remove from wishlist', error: error.message});
    }
}

module.exports = {removeFromWishlist}