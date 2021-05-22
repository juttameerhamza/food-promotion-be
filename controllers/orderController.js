const User = require('../models/userModel');
const Restaurant = require('../models/restaurantModel');
const Rider = require('../models/riderModel');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/apiError');

exports.placeHolder = catchAsync(async (req, res, next) => {
    // const currentUser = req.user;
    const { restaurantId, productId } = req.body;

    const restaurant = await User.findOne({ _id: restaurantId, role: 'restaurant', isDeleted: false, isActive: true }).lean().populate('restaurantProfile');
    const [lat, lng] = restaurant.restaurantProfile.restaurantLocation.coordinates;
    const radius = 0.02 / 6378.1;

    console.log('restaurant', restaurant);
    
    const riders = await Rider.find({
        currentLocation: {
            $geoWithin: {
                $centerSphere: [[lat, lng], radius]
            }
        }
    });
    
    console.log('riders', riders);

    res.end();
});
