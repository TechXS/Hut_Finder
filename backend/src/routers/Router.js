const {Router} = require("express");


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


module.exports = router;
