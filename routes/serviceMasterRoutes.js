const express = require('express');
const router = express.Router();
const controller = require('../controllers/serviceMasterController');
const upload = require('../middleware/upload');

router.post(
    '/',
    upload.fields([
        { name: 'serviceWebImage', maxCount: 1 },
        { name: 'serviceAppIcon', maxCount: 1 }
    ]),
    controller.createService
);
router.get('/', controller.getServices);
router.put('/:id', controller.updateService);
router.delete('/:id', controller.deleteService);
router.get('/:id', controller.getServiceById);

module.exports = router;