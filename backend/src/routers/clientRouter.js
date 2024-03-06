const {Router} = require("express");
const {addToWishList,getPropertyById,createAppointment,getAllProperties,removeFromWishlist} = require("../controllers/clientController");
const {getAllAppointments} = require("../controllers/landlordController");
const router = Router();

router.delete('/:client_id/wishlist/:property_id', removeFromWishlist)
router.get("/properties",getAllProperties)
router.post("/:id/appointments",createAppointment)
router.get('/:id/appointments', getAllAppointments)
router.get("/properties/:id",getPropertyById)
router.post('/:clientId/wishlist/:propertyId', addToWishList);
module.exports = router;