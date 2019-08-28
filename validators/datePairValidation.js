const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
    let errors = {};

    data.description = !isEmpty(data.description) ? data.description : '';

    if (Validator.isEmpty(data.start_date)) {
        errors.start_date = "Start date is required";
    }
    if (!(data.start_date < data.end_date)) {
        errors.start_date = 'Start date need to be before the end date!'
    }
    if (Validator.isEmpty(data.end_date)) {
        errors.end_date = "End date is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};