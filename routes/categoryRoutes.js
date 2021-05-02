const router = require('express').Router();
const categoryController = require('../controllers/categoryController');

router
    .route('/')
    .get(categoryController.getAllCatergories)
    .post(categoryController.createCategory);

module.exports = router;