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
    getAllAmenities
} = require("../controllers/landlordController");

const {createProperty, deleteProperty, updateProperty} = require("../controllers/propertyController");
const upload = require("../middlewares/upload");
const router = Router();

// router.get('/:id/properties', getAllProperties)
// router.post('/create', createLandlord)

router.post('/:id', upload.fields([
    {name: 'propertyImages', maxCount: 6},
    {name: 'unitImages', maxCount: 50},
]),createProperty);
router.delete('/:id', deleteProperty);
router.patch('/:id/property', updateProperty);

router.patch('/:id', updateLandlord);
router.post('/image/:id', upload.single("hutFinder-profileImages"), uploadImage);


//get
router.get('/amenities', getAllAmenities);
router.get("/:id",getLandlordData);
router.get('/:id/properties', getAllLandlordProperties)
router.get('/:id/properties/:id', getSpecificProperty)
router.get('/:id/appointments', getAllAppointments)


module.exports = router;