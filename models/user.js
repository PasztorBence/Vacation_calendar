const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    user_level: {
        type: String,
        default: 'user'
    },
    remaining_days: {
        type: Number,
        default: 21
    }
}, {
    versionKey: false,
    timestamps: true
});

module.exports = user = mongoose.model('user', UserSchema);