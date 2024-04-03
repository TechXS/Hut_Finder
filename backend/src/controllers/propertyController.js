const Property = require('../models/propertyModel');
const Landlord = require('../models/landlordModel');
const Amenity = require('../models/amenityModel');
const Unit = require('../models/unitModel');
const {isValidObjectId} = require("mongoose");
const { uploadToCloudinary, removeFromCloudinary } = require("../services/cloudinary");
const axios = require('axios');


const getNearbyPlaces = async (req, res) => {
    try {
        const { propertyID } = req.params;

        // Find the property by ID to get its location
        const property = await Property.findById(propertyID);
        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }

        // Extract the property location coordinates and format it as '-33.8670522,151.1957362'
        const location = `${property.location.coordinates[1]},${property.location.coordinates[0]}`;

        // Configure the options object with the updated location parameter
        const options = {
            method: 'GET',
            url: 'https://map-places.p.rapidapi.com/nearbysearch/json',
            params: {
                location: location,
                radius: '500',
                keyword: '',
                type: 'social'
            },
            headers: {
                'X-RapidAPI-Key': 'f88471ee74msh917767dc552c59bp1f11ebjsn308896a9244a',
                'X-RapidAPI-Host': 'map-places.p.rapidapi.com'
            }
        };

        // Make the request to the RapidAPI service
        const response = await axios.request(options);

        // Extract only the desired fields from each result
        const simplifiedResults = response.data.results.map(result => ({
            name: result.name,
            business_status: result.business_status,
            open_now: result.opening_hours ? result.opening_hours.open_now : 'N/A',
            photos: result.photos ? result.photos.map(photo => {
                // Construct URL for each photo using photo_reference
                return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=f88471ee74msh917767dc552c59bp1f11ebjsn308896a9244a`;
            }) : [],
            vicinity: result.vicinity,
            types:result.types,
            icon:result.icon
        }));

        res.status(200).json(simplifiedResults);
    } catch (error) {
        console.error('Error fetching nearby places:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



//Create property
const createProperty = async (req, res) => {
    const {id} = req.params;
    console.log('id:', id)
    const { data } = req.body;
    console.log('data:', data)
    console.log('req.body:', req.body)
    const parsedData = JSON.parse(data);
    console.log('Pdata:', parsedData)
    const unitTypes = parsedData.unitTypes;
    console.log('unitTypes:', unitTypes)
    const propertyImages = req.files.propertyImages;
    console.log('propertyImages:', propertyImages)
    const unitImages = req.files.unitImages ? req.files.unitImages : null;
    console.log('unitImages:', unitImages)

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
            pImageArray.push({publicId: data.public_id, imageUrl: data.url});
        }

    if(unitImages){
        for (const unitImage of unitImages){
            const data = await uploadToCloudinary(unitImage.path, "unit-images");
            // uImageObjArray.push(data);
            unitTypes.forEach((unit) => {
                if (unit.type === unitImage.originalname){
                    unit.images = unit.images || [];
                    unit.images.push({publicId: data.public_id, imageUrl: data.url});
                }
            })
    }}
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

const updateProperty = async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    console.log('data:', data);
    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: "Not Valid Property ID" });
    }

    const { amenities, updated_amenities, ...newData } = data;
    console.log('newData\n', newData);
    console.log('amenities\n', amenities);
    console.log('updated_amenities\n', updated_amenities);
    Property.findByIdAndUpdate(
        {_id: id}, 
        {amenities: updated_amenities, ...newData}, 
        {new: true}
    ).then((response) => {
        if (amenities){       
            for (const amenity of amenities){
                Amenity.findOne(
                    {name: amenity.name}
                ).then ((response) => {
                    console.log('Amenity found:\n', response)
                    return Property.findByIdAndUpdate(
                        {_id: id},
                        { $push: {amenities: response._id} },
                        {new: true}
                    ).then((response) => {
                        console.log('Updated property:', response)
                        // res.status(200).json({message: "Amenity id pushed to property successfully"});
                    
                    }).catch((err) => {
                        console.log("1Error:\n", err.message)
                        // res.status(400).json({error: "Error pushing amenity id to property"});
                    })
                }).catch((err) => {
                    console.log("2Error:\n", err.message)
                    // res.status(400).json({error: "Error finding amenity"});
                })
            }
        }
    }).then((response) => {
        console.log('Updated property:', response)
        res.status(200).json({message: "Property updated successfully"});
    }).catch((err) => {
        console.log("33Error:\n", err.message)
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
//upload image
const uploadpImage = async (req, res) => {
    const { id } = req.params;
    const pimages = req.files.new_pImages;
    console.log('images:', pimages)
    console.log('req.files:', req.files)

    if (!isValidObjectId(id)) {
        return res.status(400).json({error: "Not Valid Property ID"});
    }

    let pImageArray = [];
    try {
        for (const pimage of pimages){
            const data = await uploadToCloudinary(pimage.path, "property-images");
            pImageArray.push({publicId: data.public_id, imageUrl: data.url});
        }
    }
    catch (error){
        console.log('Error uploading new pimage:', error.message);
        return res.status(400).json({error: "Error uploading pimage"});
    }
    Property.findByIdAndUpdate(
        {_id: id},
        {$push: {images: pImageArray}},
        {new: true}
    ).then((response) => {
        console.log('Updated property:', response)
        res.status(200).json({message: "Property image uploaded successfully"});
    }).catch((err) => {
        console.log("Error:\n", err.message)
        res.status(400).json({error: "Error uploading property image"});
    })

    // try {
    //     const data = await uploadToCloudinary(path, "property-images");
    //     console.log('data:', data)
    //     Property.findByIdAndUpdate(
    //         {_id: id},
    //         {$push: {images: {publicId: data.public_id, imageUrl: data.url}}},
    //         {new: true}
    //     ).then((response) => {
    //         console.log('Updated property:', response)
    //         res.status(200).json({message: "Property image uploaded successfully"});
    //     }).catch((err) => {
    //         console.log("Error:\n", err.message)
    //         res.status(400).json({error: "Error uploading property image"});
    //     })
    // }
    // catch (error){
    //     console.log('Error uploading image:', error.message);
    //     return res.status(400).json({error: "Error uploading image"});
    // }
}
//delete image
const deleteImage = async (req, res) => {
    const {id} = req.params;
    const { data } = req.body;
    // const {publicId} = data;
    console.log('datapublicId:', data)
    await removeFromCloudinary(data);
    if (!isValidObjectId(id)) {
        return res.status(400).json({error: "Not Valid Property ID"});
    }
    Property.findByIdAndUpdate(
        {_id: id},
        {$pull: {images: {publicId: data}}},
        {new: true}
    ).then((response) => {
        console.log('Updated property:', response)
        res.status(200).json({message: "Property image deleted successfully"});
    }).catch((err) => {
        console.log("Error:\n", err.message)
        res.status(400).json({error: "Error deleting property image"});
    })
}

module.exports = {getNearbyPlaces,createProperty, updateProperty, deleteProperty,createAmenity,uploadpImage,deleteImage}