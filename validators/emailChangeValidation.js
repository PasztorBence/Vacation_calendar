const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.email = !isEmpty(data.email_again) ? data.email_again : '';

    if (Validator.isEmpty(data.email)) {
        errors.email = 'E-mail cím megadása kötelező!';
    }
    if (Validator.isEmpty(data.email_again)) {
        errors.email_again = 'E-mail cím megadása kötelező!';
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = 'Érvénytelen E-mail!';
    }
    if (!Validator.equals(data.email, data.email_again)) {
        errors.email_again = 'Az e-mail címek nem egyeznek egyezniük kell!';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};