const router = require('express').Router();

const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const productRoutes = require('./routes/productRoutes');
const riderRoutes = require('./routes/riderRoutes');

const jwt = require('./utils/jwt');

router.use('/auth', authRoutes);
router.use('/category', jwt.protect, categoryRoutes);
router.use('/restaurant', jwt.protect, restaurantRoutes);
router.use('/product', jwt.protect, productRoutes);
router.use('/rider', jwt.protect, riderRoutes);

module.exports = router