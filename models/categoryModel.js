const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: [true, 'Please provide category name!']
    },
    parentId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: false
    },
    isChild: {
        type: Boolean,
        default: false,
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

categorySchema.virtual('subCategories', {
    ref: 'Category',
    localField: '_id',
    foreignField: 'parentId',
    justOn: false
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;