const mongoose = require('mongoose');

// location [lng, lat]
// Google Maps lat-lng

const riderSchema = new mongoose.Schema({
    currentLocation: {
        type: {
            type: String,
            default: 'Point',
            enum: ['Point']
        },
        coordinates: [Number]
    },
    isAssigned: {
        type: Boolean,
        default: false
    },
    isOnline: {
        type: Boolean,
        default: false
    }
});

riderSchema.index({ currentLocation: '2dsphere' });

const Rider = mongoose.model('Rider', riderSchema);

module.exports = Rider;