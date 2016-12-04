import React from 'react';
var path = require('path')
var utils = require("../utils")

const {FileService} = require('../fileservice')

import Header from '../components/Header'
import Footer from '../components/Footer'
import MediaList from '../components/MediaList'

import store from '../store/MovieStore';
import MovieActions from '../actions/MovieActions';

export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            mediaFiles : store.getFiltered(),
            count : this.getCount()
        }
        this.loadMovies();
        this.updateDimensions = this.updateDimensions.bind(this);
        this.getMovies = this.getMovies.bind(this);
    }

    updateDimensions() {
        this.setState({
            count : this.getCount()
        })
    }

    getCount(){
        let width = window.innerWidth;
        let count = 6;
        if(width < 1050 && width > 800)
            count = 5;
        else if(width < 800)
            count = 4;
        return count;
    }

    componentWillMount() {
        this.updateDimensions();
    }
    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    loadMovies(){
        MovieActions.loadMovies();
    }

    componentWillMount(){
        store.on("change", this.getMovies);
    }

    componentWillUnmount(){
        store.removeListener("change", this.getMovies);
    }

    getMovies(){
        this.setState({
            mediaFiles : store.getFiltered()
        });
    }

    render() {
        return (
            <div id="mediaList">
                <MediaList mediaFiles={this.state.mediaFiles} count={this.state.count}/>    
            </div>
        );
    }
}