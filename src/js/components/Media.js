import React from 'react';
const uuidV4 = require('uuid/v4');

export default class Media extends React.Component {

    render() {
        const {mediaItem} = this.props;
        return (
            <div className="mediaItem col-sm-3 col-lg-3 col-md-3">
                <h4>{mediaItem.processedFileName}</h4>
                <p>{mediaItem.movieDataStatus}</p>
            </div>
        );
    }
}