const {Router} = require("express");
const {getAllProperties, addProperty, getSpecificProperty, createLandlord} = require("../controllers/landlordController");
const router = Router();

router.get('/:id/properties', getAllProperties)
router.get('/:id/properties/:id', getSpecificProperty)
router.post('/create', createLandlord)


module.exports = router;