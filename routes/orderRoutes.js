const router = require('express').Router();
const orderController = require('../controllers/orderController');

router
    .route('/')
    // .get(restaurantController.getAllRestaurant)
    .post(orderController.placeHolder);

// router
//     .route('/:id')
//     .get(restaurantController.getOneRestaurant);

module.exports = router;