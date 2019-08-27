const express = require('express');
const router = express.Router();
const passport = require('passport');

//Load validations
const validateRequestedVacationInput = require('../../validators/requestedVacation');

//Load model
const RequestedVacation = require('../../models/requestedVacations');

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

module.exports = router;