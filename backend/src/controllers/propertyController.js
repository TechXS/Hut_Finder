const Property = require('../models/propertyModel');
const Landlord = require('../models/landlordModel');
const Amenity = require('../models/amenityModel');
const Unit = require('../models/unitModel');
const {isValidObjectId} = require("mongoose");
const { uploadToCloudinary, removeFromCloudinary } = require("../services/cloudinary");

//Create property
const createProperty = async (req, res) => {
    const {id} = req.params;
    console.log('id:', id)
    const { data } = req.body;
    console.log('data:', data)
    console.log('req.body:', req.body)
    // for (var pair of data.entries()) {
    //     console.log('key: ',pair[0], 'value: ' , pair[1]); 
    // }
    const parsedData = JSON.parse(data);
    console.log('Pdata:', parsedData)
    const unitTypes = parsedData.unitTypes;
    console.log('unitTypes:', unitTypes)
    // console.log('files:', req.files);
    // const amenities = data.p_amenities;
    // console.log('amenities:', amenities)
    const propertyImages = req.files.propertyImages;
    console.log('propertyImages:', propertyImages)
    const unitImages = req.files.unitImages;
    console.log('unitImages:', unitImages)
    // for (const unitImage of unitImages){
    //     console.log('\nunit image original name:\n', unitImage.originalname)
    // }
    // const stop = parsedData.data.unitTypes
    // console.log('stop:', stop)

    if (!isValidObjectId(id)) {
        return res.status(400).json({error: "Not Valid Landlord ID"});
    }
    let pImageArray = [];
    try
    {    
        for (const propertyImage of propertyImages){
            const data = await uploadToCloudinary(propertyImage.path, "property-images");
            pImageArray.push(data.url);
        }

        
        for (const unitImage of unitImages){
            const data = await uploadToCloudinary(unitImage.path, "unit-images");
            // uImageObjArray.push(data);
            unitTypes.forEach((unit) => {
                if (unit.type === unitImage.originalname){
                    unit.images = unit.images || [];
                    unit.images.push(data.url);
                }
            })
        }
        console.log('New unitTypes:', unitTypes)
    }
    catch (error){
        console.log('Error uploading image:', error.message);
        return res.status(400).json({error: "Error uploading images"});
    }
    

    Property.create({
        ...parsedData,
        images: pImageArray
    })
    .then( async (property) => {
        console.log('Property id\n', property._id);

           return Landlord.findByIdAndUpdate(
            {_id: id},
            {$push: {properties: property._id}},
            {new: true}
        ).then((response) => {
            console.log("\npropeery creation success:\n");
            for (const unitType of unitTypes){
                Unit.create(unitType)
                    .then((unit) => {
                        console.log('created units:', unit._id);
                        // for (const amenity of unitType.u_special_amenities){
                        //     Amenity.create(amenity)
                        //     .then((amenity) => {
                        //         console.log('created unit amenity\n', amenity._id);
                        //         return Unit.findByIdAndUpdate(
                        //             {_id: unit._id},
                        //             {$push: {special_amenities: amenity._id}},
                        //             {new: true}
                        //         )
                        //     })
                        // }
                    return Property.findByIdAndUpdate(
                            {_id: property._id},
                            {$push: {units: unit._id}},
                            {new: true}  
                        )                    
                    })
                    .then((response)=>{
                        console.log("unit creation success");
                    })
                    .catch((err) => {
                        console.log("Error ",err.message);
                    })
            }
            // for (const amenity of amenities) {
            //     Amenity.create(amenity)
            //     .then((amenityResponse) => {
            //         console.log('success creating property amenity\n', amenityResponse._id);

            //         return Property.findByIdAndUpdate(
            //             {_id: property._id},
            //             {$push: {amenities: amenityResponse._id}},
            //             {new: true}
            //         )
            //     })
            //     .then((response)=>{
            //         console.log("amenity creation success");
            //     })
            //     .catch((err) => {
            //         console.log("Error ",err.message);
            //     })
            // }

        })
        .catch((err) => {
            console.log("Errorli:\n", err.message)
        })
    })
    .then((response) => {
        console.log('Property creation success');
        res.status(200).json({message: "Property created successfully"});
    })
    .catch((err) => {
        console.log("Error:\n", err.message)
        res.status(400).json({error: "Error creating property"});
    })
    
}

//Delete property
const deleteProperty = (req, res) => {
    const {id} = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({error: "Not Valid Property ID"});
    }
    Property.findByIdAndDelete({_id: id})
    .then((response) => {
        console.log('Deleted property:', response)
        // res.status(200).json({message: "Property deleted successfully"});
        const units = response.units;
        console.log('unitArray:', units);
        const amenities = response.amenities;
        console.log("Amenity", amenities);
        for (const unit of units){
            Unit.findByIdAndDelete({_id: unit})
            .then((response) => {
                // const special_amenities = unit.special_amenities
                console.log('Deleted unit\n', response)
                console.log('Special amenity:', response.special_amenities)
                for (const samenity of response.special_amenities){
                    Amenity.findByIdAndDelete({_id: samenity})
                    .then((response) => {
                        console.log('Deleted special amenity:', response)
                        // res.status(200).json({message: "Property deleted successfully"});
                    })
                    .catch((err) => {
                        console.log("Error:\n", err.message)
                        // res.status(400).json({error: "Error deleting property"});
                    })
                }
                // res.status(200).json({message: "Property deleted successfully"});
            })
            .catch((err) => {
                console.log("Error:\n", err.message)
                // res.status(400).json({error: "Error deleting uuuuproperty"});
            })
        }
        for (const amenity of amenities){
            Amenity.findByIdAndDelete({_id: amenity})
            .then((response) => {
                console.log('Deleted amenity:', response)
                // res.status(200).json({message: "Property deleted successfully"});
            })
            .catch((err) => {
                console.log("Error:\n", err.message)
                // res.status(400).json({error: "Error deleting property"});
            })
        }

    })
    .then((response) =>{
        console.log("Successful property creation")
        res.status(200).json({message: "Property deleted successfully"});
    })

    .catch((err) => {
        console.log("Error:\n", err.message)
        res.status(400).json({error: "Error deleting property"});
    })
}

//update property
const updateProperty = (req, res) => {
    const {id} = req.params;
    const { data } = req.body;

    if (!isValidObjectId(id)) {
        return res.status(400).json({error: "Not Valid Property ID"});
    }
    Property.findByIdAndUpdate(
        {_id: id}, 
        data, 
        {new: true}
    ).then((response) => {
        console.log('Updated property:', response)
        res.status(200).json({message: "Property updated successfully"});
    })
    .catch((err) => {
        console.log("Error:\n", err.message)
        res.status(400).json({error: "Error updating property"});
    })
}

//create amenity
const createAmenity = (req, res) => {
    const {id} = req.params;
    const { data } = req.body;
    const amenities = data.amenities;
    console.log('amenities:', amenities)

    if (!isValidObjectId(id)) {
        return res.status(400).json({error: "Not Valid Property ID"});
    }
    for (const amenity of amenities) {
        Amenity.create(amenity)
        .then((amenityResponse) => {
            console.log('success creating property amenity\n', amenityResponse._id);

            return Property.findByIdAndUpdate(
                {_id: id},
                {$push: {amenities: amenityResponse._id}},
                {new: true}
            )
        })
        .then((response)=>{
            console.log("amenity creation success");
            // res.status(200).json({message: "Amenity created successfully"});
        })
        .catch((err) => {
            console.log("Error ",err.message);
            // res.status(400).json({error: "Error creating amenity"});
        })
    }



}      
    

module.exports = {createProperty, updateProperty, deleteProperty,createAmenity}