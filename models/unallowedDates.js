const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const UnallowedDateSchema = new Schema({
    start_date: {
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

module.exports = unallowedDate = mongoose.model('unallowedDate', UnallowedDateSchema);