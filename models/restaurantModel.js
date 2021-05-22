const mongoose = require('mongoose');

// location [lat, lng]

const restaurantSchema = new mongoose.Schema({
    restaurantName: {
        type: String,
        required: [true, 'Please provide restaurant name!']
    },
    restaurantAddress: {
        type: String,
        required: [true, 'Please provide restaurant address!']
    },
    restaurantLocation: {
        type: {
            type: String,
            default: 'Point',
            enum: ['Point']
        },
        coordinates: [Number]
    }
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;