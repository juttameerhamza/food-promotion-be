const mongoose = require('mongoose')
const User = require('../models/userModel');
const Restaurant = require('../models/restaurantModel');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/apiError');

exports.getAllRestaurant = catchAsync(async (req, res, next) => {
    const restaurants = await User.find({ role: 'restaurant', isDeleted: false, isActive: true }).lean().populate('restaurantProfile');

    res.status(200).json({
        status: 'success',
        data: {
            restaurants
        }
    });
});

exports.createRestaurant = catchAsync(async (req, res, next) => {
    const {
        firstName,
        lastName,
        userName,
        gender,
        email,
        password,
        restaurantName,
        restaurantAddress
    } = req.body;

    console.log('req.body', req.body);


    const restaurant = await Restaurant.create({ restaurantName, restaurantAddress });

    const user = await User.create({
        firstName,
        lastName,
        userName,
        gender,
        email,
        password,
        role: 'restaurant',
        restaurantProfile: restaurant._id
    });

    user.restaurantProfile = restaurant;

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
});