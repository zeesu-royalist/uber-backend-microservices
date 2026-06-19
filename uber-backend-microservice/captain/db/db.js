const mongoose = require('mongoose')

function connect() {
    mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Captain service connected to MongoDB');
    }).catch(err => {
        console.log('Captain db not connected: ', err);
    });
}

module.exports = connect;