const {Router} = require("express");
const {getAllProperties, addProperty, getSpecificProperty, createLandlord, getAllAppointments,getLandlordData} = require("../controllers/landlordController");
const {createProperty, deleteProperty, updateProperty} = require("../controllers/propertyController");
const router = Router();

router.get("/:id",getLandlordData);
router.get('/:id/properties', getAllProperties)
router.get('/:id/properties/:id', getSpecificProperty)
// router.post('/create', createLandlord)
router.get('/:id/appointments', getAllAppointments)

router.post('/:id', createProperty);
router.delete('/:id', deleteProperty);
router.patch('/:id', updateProperty);


module.exports = router;