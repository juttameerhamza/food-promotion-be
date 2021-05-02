const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/apiError');

exports.createProduct = catchAsync(async (req, res, next) => {
    const product = await Product.create(req.body);

    res.status(200).json({
        status: 'success',
        data: {
            product
        }
    });
});

exports.getAllProductOfRestaurant = catchAsync(async (req, res, next) => {
    const product = await Product.find({ restaurantId: req.params.restaurantId, isDeleted: false });

    res.status(200).json({
        status: 'success',
        data: {
            product
        }
    });
});