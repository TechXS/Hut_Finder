const {Router} = require("express");
const {getAllProperties, addProperty, getSpecificProperty, createLandlord, getAllAppointments} = require("../controllers/landlordController");
const router = Router();

router.get('/:id/properties', getAllProperties)
router.get('/:id/properties/:id', getSpecificProperty)
router.post('/create', createLandlord)
router.get('/:id/appointments', getAllAppointments)
// router.get('/appointments', getAllAppointments)



module.exports = router;