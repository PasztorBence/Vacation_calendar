const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const requestedVacation = require('./routes/api/requestedVacation');
const unallowedDate = require('./routes/api/unallowedDate');

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
    //.connect(db)
    .connect('mongodb://localhost:27017/calendar', {useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

//use routes
app.use('/api/users', users);
app.use('/api/request', requestedVacation);
app.use('/api/unallow', unallowedDate);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log('Server running on port 4000'));