const router = require('express').Router();
const restaurantController = require('../controllers/restaurantController');

router
    .route('/')
    .get(restaurantController.getAllRestaurant)
    .post(restaurantController.createRestaurant);

router
    .route('/:id')
    .get(restaurantController.getOneRestaurant);

module.exports = router;