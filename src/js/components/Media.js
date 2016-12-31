import React from 'react';
const uuidV4 = require('uuid/v4');
const ipc = require('electron').ipcRenderer

import MovieDetails from './MovieDetails';

export default class Media extends React.Component {

    playVideo(){
        ipc.send('open-movie', this.props.mediaItem.absPath)
    }


    render() {
        const {mediaItem, count} = this.props;
        let classVal = "mediaItem col-sm-2 col-lg-2 col-md-2";
        if(count == 5) {
            classVal = "mediaItem col-xs-15";
        } else if(count == 4) {
            classVal = "mediaItem col-sm-3 col-lg-3 col-md-3";
        } else if(count == 3) {
            classVal = "mediaItem col-sm-4 col-lg-4 col-md-4";
        }
        let rating = '';
        if(mediaItem.imdbRating) {
            rating = <p className="imdbRating badge">{mediaItem.imdbRating}</p> 
        }

        let genre = '';
        if(mediaItem.imdbGenres) {
            genre = <p className="imdbGenre label label-primary">{mediaItem.imdbGenres}</p> 
        }
        return (
            <div className={classVal}>
                <div className="thumbnail thumbnailCol">
                    {rating}
                    {genre}
                    <img src={mediaItem.poster} alt={mediaItem.processedFileName} />
                    <span className="glyphicon glyphicon-play playBtn pointerCursor" onClick={this.playVideo.bind(this)} />
                    <div className="caption">
                        <h5 className="noOverflow movieTitle" title={mediaItem.processedFileName} data-toggle="modal" data-target={"#"+mediaItem._id}>{mediaItem.processedFileName}</h5>
                    </div>
                </div>
                <MovieDetails mediaItem={mediaItem}/>
            </div>
        );
    }
}