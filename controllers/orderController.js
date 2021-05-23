const User = require('../models/userModel');
const Restaurant = require('../models/restaurantModel');
const Rider = require('../models/riderModel');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/apiError');

exports.placeHolder = catchAsync(async (req, res, next) => {
    const currentUser = req.user;
    const { restaurantId, productId } = req.body;

    const restaurant = await User.findOne({ _id: restaurantId, role: 'restaurant', isDeleted: false, isActive: true }).lean().populate('restaurantProfile');
    const [lng, lat] = restaurant.restaurantProfile.restaurantLocation.coordinates;
    const radius = 1 / 6378.1;
    
    const riders = await Rider.find({
        'currentLocation.coordinates': {
            $geoWithin: {
                $centerSphere: [[lng, lat], radius]
            }
        },
        isOnline: true,
        isAssigned: false
    });

    const riderData = await User.findOne({ riderProfile: riders[0]._id }).lean().populate('riderProfile')

    console.log({ riderData });

    res.end();
});
