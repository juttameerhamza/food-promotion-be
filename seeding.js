require('dotenv').config();

const mongoose = require('mongoose');
const User = require('./models/userModel');

const initSeeding = async () => {
    try {
        mongoose
          .connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
          })
          .then(() => console.log('DB connection successful!'))
          .catch(() => console.log('DB connection failed!'))

        const user = await User.create({
            firstName: 'Admin',
            lastName: 'Food Promotion',
            userName: 'admin',
            gender: 'male',
            email: 'admin@food-promotion.com',
            password: 'password@123',
            role: 'admin'
        });

        console.log('------------Admin created!--------------');
        console.log('Admin: ', user);
        process.exit(0);
    } catch (error) {
        console.log('error: ', error);
        process.exit(1);
    }
};

initSeeding();