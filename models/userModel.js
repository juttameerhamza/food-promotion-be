const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    userName: {
        type: String,
        required: [true, 'Please provide your name!'],
        unique: true,
        lowercase: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: [true, 'Please provide your gender'],
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        select: false
    },
    role: {
        type: String,
        enum: ['admin', 'restaurant', 'rider', 'consumer'],
        default: 'consumer'
    },
    restaurantProfile: {
        type: mongoose.Types.ObjectId,
        ref: 'Restaurant'
    },
    riderProfile: {
        type: mongoose.Types.ObjectId,
        ref: 'Rider'
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: true,
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;