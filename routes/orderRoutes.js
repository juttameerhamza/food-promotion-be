const router = require('express').Router();
const orderController = require('../controllers/orderController');

router
    .route('/')
    // .get(restaurantController.getAllRestaurant)
    .post(orderController.placeHolder);

// router
//     .route('/:id')
//     .get(restaurantController.getOneRestaurant);

router
    .route('/:id/status')
    .patch(orderController.changeOrderStatus);

router
    .route('/restaurant/:restaurantId/:status')
    .get(orderController.checkRestaurantOrders);

router
    .route('/rider/:id')
    .get(orderController.getRiderOrders);

module.exports = router;