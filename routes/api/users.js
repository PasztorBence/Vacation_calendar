const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//Load input validation
const validateRegisterInput = require('../../validators/register');
const validateLoginInput = require('../../validators/login');

//Load user model
const User = require('../../models/user');

//@route        POST api/users/register
//@description  Felhasználó regisztrálás
//@access       Public
router.post('/register', (req, res) => {
    const {errors, isValid} = validateRegisterInput(req.body);
    //Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    user.findOne({email: req.body.email})
        .then(user => {
            if (user) {
                errors.email = 'Email already exists';
                return res.status(400).json({email: errors})
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

    const {errors, isValid} = validateLoginInput(req.body);
    //Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    //find user by email
    User.findOne({email})
        .then(user => {
            //check for user
            if (!user) {
                errors.email = 'User not found';
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
                            {expiresIn: 36000},
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                })
                            });
                    } else {
                        errors.password = 'Password incorrect';
                        return res.status(400).json(errors);
                    }
                })
        })
});

//@route        GET api/users/current
//@description  A bejelentkezett felhasználót adja vissza
//@access       Private
router.get('/current',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
            remaining_days: req.user.remaining_days,
            user_level: req.user.user_level
        });
    });

//@route        GET api/users/all
//@description  Minden felhasználót kilistáz
//@access       Private
router.get('/all',
    passport.authenticate('jwt', {session: false}),
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
                res.status(404).json({profile: 'There are no profiles'})
            })
    });

//@route        PUT api/users/admin/:id
//@description  Hátralévő napok módosítása adott felhasználónak
//@access       Private
router.put('/admin/:id',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        const newRemainingDays = {};
        newRemainingDays.remaining_days = req.body.remaining_days;
        User
            .findOneAndUpdate(
                {_id: req.params.id},
                {$set: newRemainingDays},
                {new: true}
            )
            .then(res.json({succes: true}))
            .catch(err => res.json(err))
    }
);

module.exports = router;