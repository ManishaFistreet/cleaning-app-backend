const express = require('express');
const router = express.Router();
const controller = require('../controllers/serviceMasterController');

router.post('/', controller.createService);
router.get('/', controller.getServices);
router.put('/:id', controller.updateService);
router.delete('/:id', controller.deleteService);

module.exports = router;