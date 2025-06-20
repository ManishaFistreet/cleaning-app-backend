const express = require('express');
const router = express.Router();
const controller = require('../controllers/packageController');

router.post('/', controller.createPackage);
router.get('/', controller.getPackages);
router.put('/:id', controller.updatePackage);
router.delete('/:id', controller.deletePackage);

module.exports = router;