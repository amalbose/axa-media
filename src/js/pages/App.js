import React from 'react';
import {Link} from 'react-router'

import Header from '../components/Header'
import Footer from '../components/Footer'

export default class App extends React.Component {
  
    render() {
        return (
            <div>
                <Header headerTitle='Home' />
                <Link to="/">Home</Link>
                <Link to="settings">Settings</Link>
                <Link to="about">About</Link>
                {this.props.children}
                <Footer/>
            </div>
        );
    }
}