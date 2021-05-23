const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        required: true
    },
    orderStatus: {
        type: String,
        enum: ['pending', 'preparing', 'rejected', 'picked', 'delivered'],
        required: true
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    rider: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: false
    },
    restaurant: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    consumer: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    consumerLng: {
        type: Number,
        required: true
    },
    consumerLat: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        require: true
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;