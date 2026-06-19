const mongoose = require('mongoose')

function connect() {
    mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Ride service connected to MongoDB');
    }).catch(err => {
        console.log('Ride db not connected: ', err);
    });
}

module.exports = connect;