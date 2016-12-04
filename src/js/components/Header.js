import React from 'react';
import {Link} from 'react-router'
import * as MovieActions from '../actions/MovieActions'

export default class Header extends React.Component {

    filterMovies(e){
        let query = e.target.value;
        MovieActions.filterMovies(query);
    }

    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <ul className="nav navbar-nav navbar-left">
                        <li><Link to="/" className="navbar-brand" >Axa Media</Link></li>
                    </ul>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <form className="navbar-form navbar-left">
                        <div className="form-group">
                        <input type="text" className="form-control" placeholder="Search Movies" onChange={this.filterMovies.bind(this)}/>
                        </div>
                    </form>
                    <ul className="nav navbar-nav navbar-right">
                        <li><Link to="/" className="glyphicon glyphicon-home btn-xlg" aria-hidden="true"></Link></li>
                        <li><Link to="settings" className="glyphicon glyphicon-cog btn-xlg" aria-hidden="true"></Link></li>
                        <li><Link to="about" className="glyphicon glyphicon-info-sign btn-xlg" aria-hidden="true"></Link></li>
                    </ul>
                    </div>
                </div>
            </nav>
        );
    }
}