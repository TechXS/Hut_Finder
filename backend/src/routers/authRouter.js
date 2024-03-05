const {
    logout,
    forgotPassword,
    resetPassword,
    cancelPasswordReset,
    signInLandlord,
    signInClient,
    signUpLandlord,
    signUpClient
} = require("../controllers/authController")

const {Router} = require("express");
const router = Router();
//CRUD on all landlords
router.post("/landlord/signup", signUpLandlord);
router.post("/client/signup", signUpClient);
router.post("/landlord/signin", signInLandlord);
router.post("/client/signin", signInClient);
router.delete("/logout", logout);
router.post("/forgotpassword", forgotPassword);
router.patch("/resetpassword", resetPassword);
router.delete("/cancelresetpassword", cancelPasswordReset)

module.exports = router;