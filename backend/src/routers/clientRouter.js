const {Router} = require("express");
const {addToWishList,getPropertyById,createAppointment,getAllProperties,removeFromWishlist,updateClient,uploadImage} = require("../controllers/clientController");
const {getAllAppointments} = require("../controllers/landlordController");
const router = Router();
const upload = require("../middlewares/upload");

//post
router.post("/:id/appointments",createAppointment)
router.post('/:clientId/wishlist/:propertyId', addToWishList);
router.post('/image/:id', upload.single("hutFinder-profileImages"), uploadImage);

//delete
router.delete('/:client_id/wishlist/:property_id', removeFromWishlist)

//get
router.get("/properties",getAllProperties)
router.get('/:id/appointments', getAllAppointments)
router.get("/properties/:id",getPropertyById)

//patch
router.patch('/:id', updateClient);


module.exports = router;
