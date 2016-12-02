import React from 'react';
var path = require('path')
var utils = require("./utils")
const {FileService} = require('./fileservice')

import Header from './components/Header'
import Footer from './components/Footer'
import MediaList from './components/MediaList'

export default class App extends React.Component {

    constructor() {
        super();
        this.state = {
            mediaFiles : []
        }
    }

    componentDidMount(){
        this.collectMediaFiles('/media/amalbose/D/Movies');
    }

    collectMediaFiles(filePath){
        utils.walk(filePath, (err, results) => {
            if (err) throw err;
            var f = new FileService(results)
            this.setState({
                mediaFiles : f.mediaFiles
            })
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