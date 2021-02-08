import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import jwt_decode from 'jwt-decode';
import setAuthToken from "./utils/setAuthToken";
import {logoutUser, setCurrentUser} from "./actions/authActions";
import {clearCurrentProfile} from "./actions/profileActions";
import {Provider} from 'react-redux';
import store from "./store";
//Component imports
import Navbar from "./components/layout/navbar";
import MainCalendar from "./components/mainCalendar/mainCalendar";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import UserTable from "./components/user/userTable";
import AdminTable from "./components/admin/adminTable";
import NewRequest from "./components/user/newRequest";
import UnAllowedTable from "./components/admin/unallowedTable"
import NewUnAllowing from "./components/admin/newUnallowing";
import RemainingDaysTable from "./components/admin/remainingDayTable";
import Userprofile from "./components/user/userProfile";
//Css imports
import './App.css';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';

//Check for token
if (localStorage.jwtToken) {
    //Set the auth token header auth
    setAuthToken(localStorage.jwtToken);
    //Decode token and get user info and exp
    const decoded = jwt_decode(localStorage.jwtToken);
    //Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
    //Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        //Logout user
        store.dispatch(logoutUser());
        //Clear current profile
        store.dispatch(clearCurrentProfile());
        //Redirect to Login
        window.location.href = '/login'
    }
}

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <Navbar/>
                    <Route exact path="/main" component={MainCalendar}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/user" component={UserTable}/>
                    <Route exact path="/admin" component={AdminTable}/>
                    <Route exact path="/unalloweddates" component={UnAllowedTable}/>
                    <Route exact path="/newunalloweddate" component={NewUnAllowing}/>
                    <Route exact path="/newrequest" component={NewRequest}/>
                    <Route exact path="/remainingdays" component={RemainingDaysTable}/>
                    <Route exact path="/userprofile" component={Userprofile}/>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
