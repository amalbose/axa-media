import React from 'react';
import {Link} from 'react-router'

export default class Header extends React.Component {

    render() {
        return (
            <div>
                <Link to="/" className="btn btn-primary">Home</Link>
                <Link to="settings" className="btn btn-default">Settings</Link>
                <Link to="about" className="btn btn-default">About</Link>
            </div>
        );
    }
}