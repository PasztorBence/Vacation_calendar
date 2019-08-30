const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    if (!Validator.isLength(data.name, {min: 2, max: 30})) {
        errors.name = 'A név 2 és 30 karakter között legyen!'
    }
    if (Validator.isEmpty(data.name)) {
        errors.name = 'Név megadása kötelező!';
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = 'E-mail cím megadása kötelező!';
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = 'Érvénytelen E-mail!';
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Jelszó megadása kötelező!';
    }
    if (!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = 'A jelszó 6 és 30 karakter között legyen!';
    }
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = 'Jelszó megerősítése kötelező!';
    }
    if (!Validator.equals(data.password, data.password2)) {
        errors.password = 'A jelszavaknak egyezniük kell!';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};