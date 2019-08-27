const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const UnallowedVacationSchema = new Schema({
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    description: {
        type: String
    }
}, {
    versionKey: false,
    timestamps: true
});

module.exports = requestedVacations = mongoose.model('requestedVacation', UnallowedVacationSchema);