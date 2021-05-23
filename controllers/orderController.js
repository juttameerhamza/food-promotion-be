const { v4: uuidv4 } = require('uuid');
const User = require('../models/userModel');
const Restaurant = require('../models/restaurantModel');
const Rider = require('../models/riderModel');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/apiError');

const generateOrderId = (user) => {
    const userId = `${user._id}`;
    const shortUUID = uuidv4().split('-')[0];
    const shortUserID = userId.substr(userId.length - 4);

    return `${shortUUID}-${shortUserID}`;
}

// exports.placeHolder = catchAsync(async (req, res, next) => {
//     const currentUser = req.user;
//     const { restaurantId, productId } = req.body;

//     const restaurant = await User.findOne({ _id: restaurantId, role: 'restaurant', isDeleted: false, isActive: true }).lean().populate('restaurantProfile');
//     const [lng, lat] = restaurant.restaurantProfile.restaurantLocation.coordinates;
//     const radius = 1 / 6378.1;

//     const riders = await Rider.find({
//         'currentLocation.coordinates': {
//             $geoWithin: {
//                 $centerSphere: [[lng, lat], radius]
//             }
//         },
//         isOnline: true,
//         isAssigned: false
//     });

//     if(riders.length > 0) {
//         const riderData = await User.findOne({ riderProfile: riders[0]._id }).lean().populate('riderProfile');

//         console.log({ riderData });

//         res.status(200).json({
//             status: 'success',
//             data: {
//                 riderData
//             }
//         });
//     } else {

//     }
// });

exports.placeHolder = catchAsync(async (req, res, next) => {
    const currentUser = req.user;
    const { restaurantId, productId, userLocationLng, userLocationLat } = req.body;

    const product = await Product.findById(productId);

    const order = await Order.create({
        orderNumber: generateOrderId(currentUser),
        orderStatus: 'pending',
        product: product._id,
        restaurant: restaurantId,
        consumer: currentUser._id,
        consumerLng: userLocationLng,
        consumerLat: userLocationLat,
        totalPrice: product.productUnitPrice
    });

    res.status(200).json({
        status: 'success',
        data: {
            order
        }
    });
});

exports.checkRestaurantOrders = catchAsync(async (req, res, next) => {
    const orders = await Order.find({ restaurant: req.params.restaurantId, orderStatus: req.params.status });

    res.status(200).json({
        status: 'success',
        data: {
            orders
        }
    });
});

exports.changeOrderStatus = catchAsync(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    console.log({ order });

    if (req.body.status === 'preparing') {
        const restaurant = await User.findOne({ _id: order.restaurant, role: 'restaurant', isDeleted: false, isActive: true }).lean().populate('restaurantProfile');

        console.log({ restaurant });

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

        console.log({ riders });

        if (riders.length > 0) {
            // order.orderStatus = 'preparing';
            // await order.save();
            const riderData = await User.findOne({ riderProfile: riders[0]._id }).lean().populate('riderProfile');

            const order = await Order
                .findByIdAndUpdate(req.params.id, { orderStatus: req.body.status, rider: riderData._id }, { new: true })
                .lean()
                .populate('rider')
                .populate('restaurant')
                .populate('consumer');

            console.log('whole order', order);

            res.status(200).json({
                status: 'success',
                data: {
                    order
                }
            });
        } else {
            res.status(200).json({
                status: 'fail',
                message: 'No rider found!'
            });
        }

        // res.status(200).json({
        //     status: 'success',
        //     data: {
        //         order
        //     }
        // });
    } else if (req.body.status === 'picked' || req.body.status === 'delivered') {
        const order = await Order
            .findByIdAndUpdate(req.params.id, { orderStatus: req.body.status }, { new: true })
            .lean()
            .populate('rider')
            .populate('restaurant')
            .populate('consumer');

        res.status(200).json({
            status: 'success',
            data: {
                order
            }
        });
    }

    // const order = await Order.findByIdAndUpdate(req.params.id , { orderStatus: req.body.status }, { new: true });

    // res.status(200).json({
    //     status: 'success',
    //     data: {
    //         order
    //     }
    // });
});

exports.getRiderOrders = catchAsync(async (req, res, next) => {
    const order = await Order.findOne({ rider: req.params.id, orderStatus: 'preparing' });

    res.status(200).json({
        status: 'success',
        data: {
            order
        }
    });
});