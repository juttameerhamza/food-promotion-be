require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');

mongoose
    .connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log('DB connection successful!'))
    .catch(() => console.log('DB connection failed!'))

const port = process.env.PORT || 3000;
const envoironment = process.env.NODE_ENV;

app.listen(port, '0.0.0.0', () => {
    console.log(`Application running on ${port} and in ${envoironment} mode...`);
});