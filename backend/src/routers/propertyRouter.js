const {Router} = require('express');
const { createProperty, updateProperty, deleteProperty } = require('../controllers/propertyController');

const router = Router();

router.post('/:id/create', createProperty);
router.delete('/:id/delete', deleteProperty);
router.patch('/:id/update', updateProperty);

module.exports = router;