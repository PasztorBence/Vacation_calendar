const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const RequestedVacationSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    state: {
        type: String,
        default: 'Függőben'
    },
    color: {
        type: String,
        default: 'yellow'
    },
    description: {
        type: String
    }
}, {
    versionKey: false,
    timestamps: true
});

module.exports = requestedVacations = mongoose.model('requestedVacation', RequestedVacationSchema);