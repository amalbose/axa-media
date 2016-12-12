import React from 'react';
const uuidV4 = require('uuid/v4');

export default class Media extends React.Component {

    render() {
        const {mediaItem, count} = this.props;
        let classVal = "mediaItem col-sm-2 col-lg-2 col-md-2";
        if(count == 5) {
            classVal = "mediaItem col-xs-15";
        } else if(count == 4) {
            classVal = "mediaItem col-sm-3 col-lg-3 col-md-3";
        }
        let rating = '';
        if(mediaItem.imdbRating) {
            rating = <p className="imdbRating">{mediaItem.imdbRating}</p> 
        }
        return (
            <div className={classVal}>
                <div className="thumbnail thumbnailCol">
                    {rating}
                    <img src={mediaItem.poster} alt={mediaItem.processedFileName} />
                    <div className="caption">
                        <h5 className="noOverflow movieTitle" title={mediaItem.processedFileName}>{mediaItem.processedFileName}</h5>
                     {/*   <p><a href="#" className="btn btn-primary" role="button">Button</a> <a href="#" className="btn btn-default" role="button">Button</a></p>
                        */}
                    </div>
                </div>
            </div>
        );
    }
}