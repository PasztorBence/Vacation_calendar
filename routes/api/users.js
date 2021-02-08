const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//Load input validation
const validateRegisterInput = require('../../validators/register');
const validateLoginInput = require('../../validators/login');
const validateEmailChange = require('../../validators/emailChangeValidation');
const validatePasswordChange = require('../../validators/passwordChangeValidation');

//Load user model
const User = require('../../models/user');
const passwordChangeValidation = require('../../validators/passwordChangeValidation');
const emailChangeValidation = require('../../validators/emailChangeValidation');

//@route        POST api/users/register
//@description  Felhasználó regisztrálás
//@access       Public
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    //Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                errors.email = 'Ez az e-mail cím már regisztrálva van!';
                return res.status(400).json({ email: errors })
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })
            }
        })
});

//@route        POST api/users/login
//@description  Login User / Returning JWT Token
//@access       Public
router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);
    //Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    //find user by email
    User.findOne({ email })
        .then(user => {
            //check for user
            if (!user) {
                errors.email = 'Hibás e-mail cím!';
                return res.status(404).json(errors)
            }
            //check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        //user Matched
                        const payload = { // Create JWT Payload
                            id: user.id,
                            name: user.name,
                            user_level: user.user_level
                        };
                        //Sign Token
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            { expiresIn: 36000 },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                })
                            });
                    } else {
                        errors.password = 'Hibás jelszó!';
                        return res.status(400).json(errors);
                    }
                })
        })
});

//@route        GET api/users/current
//@description  A bejelentkezett felhasználót adja vissza
//@access       Private
router.get('/current',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
            notification_email: req.user.notification_email,
            remaining_days: req.user.remaining_days,
            user_level: req.user.user_level
        });
    });

//@route        GET api/users/all
//@description  Minden felhasználót kilistáz
//@access       Private
router.get('/all',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        User.find()
            .then(users => {
                if (!users) {
                    errors.nouser = 'There is no users';
                    return res.status(404).json(errors);
                }
                res.json(users);
            })
            .catch(err => {
                res.status(404).json({ profile: 'There are no profiles' })
            })
    });

//@route        PUT api/users/admin/:id
//@description  Hátralévő napok módosítása adott felhasználónak
//@access       Private
router.put('/admin/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const newRemainingDays = {};
        newRemainingDays.remaining_days = req.body.remaining_days;
        User
            .findOneAndUpdate(
                { _id: req.params.id },
                { $set: newRemainingDays },
                { new: true }
            )
            .then(User.find()
                .then(users => {
                    if (!users) {
                        errors.nouser = 'There is no users';
                        return res.status(404).json(errors);
                    }
                    res.json(users);
                })
                .catch(err => {
                    res.status(404).json({ profile: 'There are no profiles' })
                })
            )
            .catch(err => {
                res.status(400).json({ remainingday: 'Cant update remaining days' })
            })
    });

//@route        PUT api/users/nemail/:id
//@description  telephely e-mail címének módosítása adott felhasználónak
//@access       Private
router.put('/nemail/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const newEmail = {};
        newEmail.notification_email = req.body.notification_email;
        User
            .findOneAndUpdate(
                { _id: req.params.id },
                { $set: newEmail },
                { new: true }
            )
            .then(User.find()
                .then(users => {
                    if (!users) {
                        errors.nouser = 'There is no users';
                        return res.status(404).json(errors);
                    }
                    res.json(users);
                })
                .catch(err => {
                    res.status(404).json({ profile: 'There are no profiles' })
                })
            )
            .catch(err => {
                res.status(400).json({ notification_email: 'Cant update the notification e-mail' })
            })
    });

//@route        PUT api/users/password/:id
//@description  jelszó módosítása adott felhasználónak
//@access       Private
router.put('/password/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = passwordChangeValidation(req.body);
        //Check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }
        const newPassword = {};
        newPassword.password = req.body.password;
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newPassword.password, salt, (err, hash) => {
                if (err) throw err;
                newPassword.password = hash;
                User
                    .findOneAndUpdate(
                        { _id: req.params.id },
                        { $set: newPassword },
                        { new: true }
                    )
                    .then(User.find()
                        .then(users => {
                            if (!users) {
                                errors.nouser = 'There is no users';
                                return res.status(404).json(errors);
                            }
                            res.json(users);
                        })
                        .catch(err => {
                            res.status(404).json({ profile: 'There are no profiles' })
                        })
                    )
                    .catch(err => {
                        res.status(400).json({ remainingday: 'Cant change password' })
                    })
            })
        })
    });

//@route        PUT api/users/email/:id
//@description  e-mail cím módosítása adott felhasználónak
//@access       Private
router.put('/email/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        console.log(req.body)
        const { errors, isValid } = emailChangeValidation(req.body);
        //Check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }
        const newEmail = {};
        newEmail.email = req.body.email;
        User
            .findOneAndUpdate(
                { _id: req.params.id },
                { $set: newEmail },
                { new: true }
            )
            .then(User.find()
                .then(users => {
                    if (!users) {
                        errors.nouser = 'There is no users';
                        return res.status(404).json(errors);
                    }
                    res.json(users);
                })
                .catch(err => {
                    res.status(404).json({ profile: 'There are no profiles' })
                })
            )
            .catch(err => {
                res.status(400).json({ remainingday: 'Cant change password' })
            })
    });

module.exports = router;