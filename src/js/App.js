import React from 'react';
var path = require('path')
var utils = require("./utils")
const {FileService} = require('./fileservice')

import Header from './components/Header'
import Footer from './components/Footer'
import MediaList from './components/MediaList'

import store from './store/MovieStore';
import MovieActions from './actions/MovieActions';

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            mediaFiles : store.getAll()
        }
        this.loadMovies();
    }

    loadMovies(){
        console.log(MovieActions)
        MovieActions.loadMovies();
    }

    componentWillMount(){
        store.on("change", ()=>{
            this.setState({
                mediaFiles : store.getAll()
            });
        });
    }

    render() {
        return (
            <div>
                <Header headerTitle='Home' />
                <MediaList mediaFiles={this.state.mediaFiles} />    
                <Footer/>
            </div>
        );
    }
}