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
        return (
            <div className={classVal}>
                <h4>{mediaItem.processedFileName}</h4>
                <p>{mediaItem.movieDataStatus}</p>
            </div>
        );
    }
}