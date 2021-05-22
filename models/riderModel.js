const mongoose = require('mongoose');

// location [lat, lng]

const riderSchema = new mongoose.Schema({
    currentLocation: {
        type: {
            type: String,
            default: 'Point',
            enum: ['Point']
        },
        coordinates: [Number]
    },
    isOnline: {
        type: Boolean,
        default: false
    }
});

const Rider = mongoose.model('Rider', riderSchema);

module.exports = Rider;