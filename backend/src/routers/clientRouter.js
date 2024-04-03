const {Router} = require("express");
const {addToWishList,getPropertyById,createAppointment,getAllProperties,removeFromWishlist,updateClient,uploadImage,addFavouriteamenity, getWishlistProperties, getAllClientAppointments} = require("../controllers/clientController");
const {getAllAppointments} = require("../controllers/clientController");
const router = Router();
const upload = require("../middlewares/upload");

//post
router.post("/:id/appointments",createAppointment)
router.post('/wishlist/:clientId/',addFavouriteamenity)
router.post('/:clientId/wishlist/:propertyId', addToWishList);
router.post('/image/:id', upload.single("hutFinder-profileImages"), uploadImage);

//delete
router.delete('/:client_id/wishlist/:property_id', removeFromWishlist)

//get
router.get("/properties",getAllProperties)
router.get('/:clientId/appointments', getAllAppointments)
router.get("/properties/:id",getPropertyById)
router.get("/:clientId/wishlist",getWishlistProperties)

//patch
router.patch('/:id', updateClient);


module.exports = router;
