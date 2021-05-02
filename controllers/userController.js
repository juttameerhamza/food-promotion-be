const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/apiError');
const jwt = require('../utils/jwt');

const createSendToken = (user, statusCode, res) => {
    const token = jwt.signToken({ userId: user._id, role: user.role });

    // user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ApiError('Please provide email and password!', 400));
    }

    const user = await User.findOne({ email, password, isActive: true, isDeleted: false })

    if (!user) {
        return next(new ApiError('Incorrect email or password', 401));
    }

    createSendToken(user, 200, res);
});

exports.signup = catchAsync(async (req, res, next) => {    
    const user = await User.create(req.body);

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
});