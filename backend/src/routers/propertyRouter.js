const {Router} = require('express');
const { createProperty, updateProperty, deleteProperty,createAmenity, getNearbyPlaces } = require('../controllers/propertyController');

const router = Router();

router.post('/:id', createProperty);
router.get('/:propertyID',getNearbyPlaces);
router.delete('/:id', deleteProperty);
router.patch('/:id', updateProperty);
router.post('/:id/amenity', createAmenity); 

module.exports = router;