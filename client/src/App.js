import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Provider} from 'react-redux';
import jwt_decode from 'jwt-decode';

//TODO imports
import Navbar from "./components/layout/navbar";
import MainCalendar from "./components/mainCalendar";
import Register from "./components/auth/register";

import './App.css';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar/>
                <Route exact path="/main" component={MainCalendar}/>
                <Route exact path="/register" component={Register}/>
            </div>
        </Router>
    );
}

export default App;
