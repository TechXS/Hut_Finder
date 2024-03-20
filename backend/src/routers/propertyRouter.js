const {Router} = require('express');
const { createProperty, updateProperty, deleteProperty,createAmenity } = require('../controllers/propertyController');

const router = Router();

router.post('/:id', createProperty);
router.delete('/:id', deleteProperty);
router.patch('/:id', updateProperty);
router.post('/:id/amenity', createAmenity); 

module.exports = router;