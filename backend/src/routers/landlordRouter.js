const {Router} = require("express");
const {getAllProperties, addProperty, getSpecificProperty} = require("../controllers/landlordController");
const router = Router();

router.get('/:id/properties', getAllProperties)
router.get('/:id/properties/:id', getSpecificProperty)


module.exports = router;