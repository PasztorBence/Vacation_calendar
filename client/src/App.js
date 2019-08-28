import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import  {Provider} from 'react-redux';
import jwt_decode from 'jwt-decode';

//TODO imports
import store from './store'

import './App.css';

function App() {
  return (
    <Provider store={store}>

    </Provider>
  );
}

export default App;
