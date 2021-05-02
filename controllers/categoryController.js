const Category = require('../models/categoryModel');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/apiError');

exports.getAllCatergories = catchAsync(async (req, res, next) => {
    const categories = await Category.find({ isChild: false, isDeleted: false }).lean().populate('subCategories');

    res.status(200).json({
        status: 'success',
        data: {
            categories
        }
    });
});

exports.createCategory = catchAsync(async (req, res, next) => {
    const category = await Category.create(req.body);

    res.status(200).json({
        status: 'success',
        data: {
            category
        }
    });
});