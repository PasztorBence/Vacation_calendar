const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password_again) ? data.password_again : '';

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Jelszó megadása kötelező!';
    }
    if (!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = 'A jelszó 6 és 30 karakter között legyen!';
    }
    if (Validator.isEmpty(data.password2)) {
        errors.password_again = 'Jelszó megerősítése kötelező!';
    }
    if (!Validator.equals(data.password, data.password2)) {
        errors.password_again = 'A jelszavaknak egyezniük kell!';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};