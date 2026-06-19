const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600  // for 1h.
    }
}, { timestamps: true })

module.exports = mongoose.model('blacklisttokenSchema', blacklistTokenSchema)