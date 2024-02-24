const {Router} = require("express");
const {removeFromWishlist} = require("../controllers/clientController");
const router = Router();

router.delete('/:id/wishlist', removeFromWishlist)
module.exports = router;