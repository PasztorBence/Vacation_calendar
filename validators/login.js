const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';


    if (!Validator.isEmail(data.email)) {
        errors.email = 'Érvénytelen E-mail!';
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = 'E-mail cím megadása kötelező!';
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Jelszó megadása kötelező!';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};