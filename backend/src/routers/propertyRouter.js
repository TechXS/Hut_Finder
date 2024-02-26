const {Router} = require('express');
const { createProperty, deleteProperty } = require('../controllers/propertyController');

const router = Router();

router.post('/:id/create', createProperty);
router.delete('/:id/delete', deleteProperty);

module.exports = router;