const express = require('express');
const router = express.Router();
const controller = require('../controllers/servicePriceMasterController');

router.post('/', controller.createPrice);
router.get('/', controller.getPrices);
router.put('/:id', controller.updatePrice);
router.delete('/:id', controller.deletePrice);

module.exports = router;