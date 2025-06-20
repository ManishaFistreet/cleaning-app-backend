const express = require('express');
const router = express.Router();
const controller = require('../controllers/showcaseController');

router.post('/', controller.createShowcase);
router.get('/', controller.getShowcases);
router.put('/:id', controller.updateShowcase);
router.delete('/:id', controller.deleteShowcase);

module.exports = router;