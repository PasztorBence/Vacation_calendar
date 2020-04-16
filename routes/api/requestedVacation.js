const express = require('express');
const router = express.Router();
const passport = require('passport');
const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
    host: require('../../config/emailTransport').host,
    port: require('../../config/emailTransport').port,
    auth: {
        user: require('../../config/emailTransport').user,
        pass: require('../../config/emailTransport').pass
    }
});

//Load validations
const validateRequestedVacationInput = require('../../validators/datePairValidation');

//Load model
const RequestedVacation = require('../../models/requestedVacations');
const UnallowedDate = require('../../models/unallowedDates');

//@route        GET api/request/all
//@description  Minden kérést lekér
//@access       Private
router.get('/all',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        RequestedVacation
            .find()
            .populate('user', ['name', 'remaining_days', 'email'])
            .sort({ state: -1 })
            .then(requests => res.json(requests))
            .catch(err => res.status(404).json({ norequestsfound: 'No requests found' }));
    }
);

//
//DOLGOZÓ MŰVELETEK
//

//@route        POST api/request/user
//@description  A dolgozó kérvényez
//@access       Private
router.post('/user',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateRequestedVacationInput(req.body);
        //check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }

        UnallowedDate.findOne({ start_date: { $gte: req.body.start_date, $lte: req.body.end_date } })
            .then(unallowed => {
                if (unallowed) {
                    errors.start_date = 'Ez a dátum tiltott!';
                    return res.status(400).json(errors)
                } else {
                    if (!isValid) {
                        //return any errors with 400 status
                        return res.status(400).json(errors);
                    } else {
                        const newRequest = new RequestedVacation({
                            user: req.user.id,
                            start_date: req.body.start_date,
                            end_date: req.body.end_date,
                            description: req.body.description
                        });
                        const start_date = new Date(req.body.start_date);
                        const start_day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(start_date);
                        const start_month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(start_date);
                        const start_year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(start_date);
                        const end_date = new Date(req.body.start_date);
                        const end_day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(end_date);
                        const end_month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(end_date);
                        const end_year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(end_date);
                        transport.sendMail({
                            from: "admin@ecofa.hu",
                            to: "admin@ecofa.hu",
                            subject: "Szabadság igénylés tőle: " + req.user.name,
                            text: req.user.name + " szeretne szabadságot " + start_year + "." + start_month + "." + start_day + " - " + end_year + "." + end_month + "." + end_day + " között."
                        });
                        newRequest
                            .save()
                            .then(request => res.json(request))
                            .catch(err => console.log(err));
                    }
                }
            })
    }
);


//@route        GET api/request/user/:id
//@description  A dolgozó saját kéréseit lekéri
//@access       Private
router.get('/user/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        RequestedVacation
            .find({ user: req.params.id })
            .sort({ state: -1 })
            .then(post => res.json(post))
            .catch(err => res.status(404).json({ norequestfound: 'No request found with that id' }))
    }
);

//@route        DELETE api/request/user/:id
//@description  A dolgozó törli egy kérését id alapján
//@access       Private
router.delete('/user/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        RequestedVacation
            .deleteOne({ _id: req.params.id })
            .then(RequestedVacation
                .find({ user: req.params.id })
                .sort({ state: -1 })
                .then(post => res.json(post))
                .catch(err => res.status(404).json({ norequestfound: 'No request found with that id' }))
            )
            .catch(err => res.status(404).json({ norequestfound: 'No request found with that id' }))
    }
);

//@route        PUT api/request/user/:id
//@description  A dolgozó módosítja egy kérését id alapján
//@access       Private
router.put('/user/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const requestFields = {};

        requestFields.start_date = req.body.start_date;
        requestFields.end_date = req.body.end_date;
        requestFields.description = req.body.description;

        RequestedVacation
            .findOneAndUpdate(
                { _id: req.params.id },
                { $set: requestFields },
                { new: true }
            )
            .then(request => res.json(request))
            .catch(err => res.json(err))
    }
);

//
//ADMIN MŰVELETEK
//

//@route        PUT api/request/admin/:id
//@description  Az admin elbírálja az adott id-vel rendelkező kérést
//@access       Private
router.put('/admin/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const newState = {};
        newState.state = req.body.state;
        newState.color = req.body.color;
        const start_date = new Date(req.body.start_date);
        const start_day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(start_date);
        const start_month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(start_date);
        const start_year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(start_date);
        const end_date = new Date(req.body.start_date);
        const end_day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(end_date);
        const end_month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(end_date);
        const end_year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(end_date);
        RequestedVacation
            .findOneAndUpdate(
                { _id: req.params.id },
                { $set: newState },
                { new: true }
            )
            .then(
                RequestedVacation
                    .find()
                    .populate('user', ['name', 'remaining_days'])
                    .sort({ state: -1 })
                    .then(requests => res.json(requests))
                    .catch(err => res.status(404).json({ norequestsfound: 'No requests found' })))
            .catch(err => res.json(err))
        transport.sendMail({
            from: "admin@ecofa.hu",
            to: req.body.email,
            subject: "Szabadság elbírálás",
            text: "A " + start_year + "." + start_month + "." + start_day + " - " + end_year + "." + end_month + "." + end_day + " közötti szabadság " + req.body.state
        });
    }
);

module.exports = router;