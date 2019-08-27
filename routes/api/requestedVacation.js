const express = require('express');
const router = express.Router();
const passport = require('passport');

//Load validations
const validateRequestedVacationInput = require('../../validators/requestedVacation');

//Load model
const RequestedVacation = require('../../models/requestedVacations');
const User = require('../../models/user');

//@route        POST api/request
//@description  Request a vacation
//@access       Private
router.post('/', passport.authenticate('jwt', {session: false}),
    (req, res) => {
        const {errors, isValid} = validateRequestedVacationInput(req.body);
        //Check validation
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
            newRequest
                .save()
                .then(request => res.json(request))
                .catch(err => console.log(err));
        }

    }
);

//@route        GET api/request/all
//@description  Get all request
//@access       Private
router.get('/all',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        RequestedVacation
            .find()
            .sort({date: -1})
            .then(requests => res.json(requests))
            .catch(err => res.status(404).json({norequestsfound: 'No requests found'})
            );
    }
);

//@route        GET api/request/:id
//@description  Get request by id
//@access       Private
router.get('/:id',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        RequestedVacation
            .findById(req.params.id)
            .then(post => res.json(post))
            .catch(err => res.status(404).json({norequestfound: 'No request found with that id'}))
    }
);




















//@route        POST api/request/:request_id
//@description  Delete a request by id
//@access       Private
router.delete('/:request_id',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        RequestedVacation
            .findone(req.params.id)
            .then(request => res.json(request))
    });

module.exports = router;