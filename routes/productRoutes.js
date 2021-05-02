const router = require('express').Router();
const productController = require('../controllers/productController');

router
    .route('/')
    .post(productController.createProduct);

router.get('/restaurant/:restaurantId', productController.getAllProductOfRestaurant);

module.exports = router;