const { promisify } = require('util');
const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('./catchAsync');
const ApiError = require('./apiError');

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

exports.signToken = (data, expiresIn = JWT_EXPIRES_IN) => {
    return jsonwebtoken.sign(data, JWT_SECRET, { expiresIn });
}

exports.verifyToken = (token, cb) => {
    jsonwebtoken.verify(token, JWT_SECRET, (error, decoded) => {
        if(error) {
            cb(error, null);
        } else {
            cb(null, decoded);
        }
    });
};

exports.protect = catchAsync(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return next(
            new ApiError('You are not logged in! Please log in to get access.', 401)
        );
    }

    const decoded = await promisify(jsonwebtoken.verify)(token, JWT_SECRET);

    const currentUser = await User.findById(decoded.userId);
    if (!currentUser) {
        return next(
            new ApiError('The user belonging to this token does no longer exist.', 401)
        );
    }

    req.user = currentUser;
    next();
});