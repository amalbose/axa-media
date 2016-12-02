import React from 'react';
const _ = require('lodash');
const uuidV4 = require('uuid/v4');

import Media from './Media'

class MediaRow extends React.Component {
    render(){
        return (
            <div key={uuidV4()} className="row">
                {this.props.mediaRow}
            </div>
        );
    }
}

export default class MediaList extends React.Component {

    renderMediaRow(mediaRow, index){
        return (
            <MediaRow key={uuidV4()}  mediaRow={mediaRow} />
        );
    }

    renderMediaBlock(media, index) {
        return <Media key={index} mediaItem={media} />
    }

    renderMediaList(Medias){
        let blocks = []
        let rows = []
        _.forEach(Medias, (item, index) => {
            const mediaBlock = this.renderMediaBlock(item, index);
            if (mediaBlock) {
                blocks.push(mediaBlock);
            }
            if (blocks.length >= 6) {
                const row = this.renderMediaRow(blocks, index);
                if (row) {
                    rows.push(row);
                }
                blocks = [];
            }
        });    
        const row = this.renderMediaRow(blocks);
        if (row) {
                rows.push(row); 
        }
        return rows;
    }

    render() {
        // const Medias = this.props.mediaFiles.map((item, i)=> <Media key={i} mediaItem={item} />)
        
        return (
            <div className="container-fluid">
                {this.renderMediaList(this.props.mediaFiles)}
            </div>
        );
    }
}