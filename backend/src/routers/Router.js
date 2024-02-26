const {Router} = require("express");
const {getAllProperties}=require("../controllers/getAllProperties")
const {getPropertyById}=require("../controllers/getSpecificProperties")
const {createAppointment}=require("../controllers/createAppointment")
const{addToWishList}=require("../controllers/addTowishlist")


const {
    requireLandlordAuth,
    requireClientAuth,
} = require("../middlewares/jwt");
const landlordRoutes = require("./landlordRouter");
const clientRoutes = require("./clientRouter");
const authRoutes = require("./authRouter");
const { get } = require("mongoose");

const router = Router();
router.use("/auth", authRoutes);
router.use("/landlord", landlordRoutes);
router.use("/client", clientRoutes);
router.get("/properties",getAllProperties)
router.post("/appointments",createAppointment)
router.get("/properties/:id",getPropertyById)
router.post('/client/:clientId/wishlist/:propertyId', addToWishList);

module.exports = router;
