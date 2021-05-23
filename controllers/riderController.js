const User = require('../models/userModel');
const Rider = require('../models/riderModel');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/apiError');

exports.getAllRider = catchAsync(async (req, res, next) => {
    const riders = await User.find({ role: 'rider', isDeleted: false, isActive: true }).lean().populate('riderProfile');

    res.status(200).json({
        status: 'success',
        data: {
            riders
        }
    });
});

exports.createRider = catchAsync(async (req, res, next) => {
    const {
        firstName,
        lastName,
        userName,
        gender,
        email,
        password
    } = req.body;

    const rider = await Rider.create({ currentLocation: { coordinates: [0, 0] } });

    const user = await User.create({
        firstName,
        lastName,
        userName,
        gender,
        email,
        password,
        role: 'rider',
        riderProfile: rider._id
    });

    user.riderProfile = rider;

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
});

exports.updateLocation = catchAsync(async (req, res, next) => {
    const { currentLocation, riderProfileId } = req.body;
    const rider = await Rider.findByIdAndUpdate(riderProfileId, { currentLocation });

    res.status(200).json({
        status: 'success'
    });
});

exports.updateStatus = catchAsync(async (req, res, next) => {
    const { online, riderProfileId } = req.body;

    const rider = await Rider.findByIdAndUpdate(riderProfileId, { isOnline: online });

    res.status(200).json({
        status: 'success'
    });
})