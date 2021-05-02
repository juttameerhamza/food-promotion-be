const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, 'Please provide restaurant name!']
    },
    productUnitPrice: {
        type: Number,
        required: [true, 'Please provide product unit price!']
    },
    productUnit: {
        type: String,
        required: [true, 'Please provide product unit!']
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: 'Category'
    },
    restaurantId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
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

const Product = mongoose.model('Product', productSchema);

module.exports = Product;