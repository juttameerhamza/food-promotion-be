const router = require('express').Router();
const riderController = require('../controllers/riderController');

router
    .route('/')
    .get(riderController.getAllRider)
    .post(riderController.createRider);

router
    .route('/location')
    .patch(riderController.updateLocation);

module.exports = router;