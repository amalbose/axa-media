import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from "react-router" 

import App from './pages/App';
import Home from './pages/Home';
import Settings from './pages/Settings';
import About from './pages/About';

global.jQuery = global.$ = require('jquery');
require('bootstrap');

ReactDOM.render( 
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}></IndexRoute>
            <Route path="settings" component={Settings} ></Route>
            <Route path="about" component={About} ></Route>
        </Route>
    </Router> , 
    document.getElementById('app'));