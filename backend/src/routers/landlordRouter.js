const {Router} = require("express");
const {
    getAllProperties,
    addProperty,
    getSpecificProperty, 
    createLandlord, 
    getAllAppointments,
    getLandlordData,
    getAllLandlordProperties,
    updateLandlord,
    uploadImage,
    getAllAmenities,
    updateUnit
} = require("../controllers/landlordController");

const {
    createProperty, 
    deleteProperty, 
    updateProperty, 
    uploadpImage, 
    deleteImage,
    deleteUnitImage
} = require("../controllers/propertyController");
const upload = require("../middlewares/upload");
const router = Router();

// router.get('/:id/properties', getAllProperties)
// router.post('/create', createLandlord)
  
//post
router.post('/image/:id', upload.single('hutFinder-profileImages'), uploadImage);
router.post('/:id', upload.fields([
    {name: 'propertyImages', maxCount: 10},
    {name: 'unitImages', maxCount: 50},
]),createProperty);
router.post('/:id/property/image', upload.fields([
    {name: 'new_pImages', maxCount: 10}
]), uploadpImage);


//delete
router.delete('/:id', deleteProperty);
router.delete('/:id/property/image', deleteImage);
router.delete('/:id/unit/images', deleteUnitImage);


//patch
router.patch('/:id/property', updateProperty);
router.patch('/:id', updateLandlord);
router.patch('/:id/property/unit', updateUnit);

//get
router.get('/amenities', getAllAmenities);
router.get("/:id",getLandlordData);
router.get('/:id/properties', getAllLandlordProperties)
router.get('/:id/properties/:id', getSpecificProperty)
router.get('/:id/appointments', getAllAppointments)


module.exports = router;