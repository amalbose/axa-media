import React from 'react';
const uuidV4 = require('uuid/v4');

import ScanDirectory from './ScanDirectory';

export default class ScanDirectoryList extends React.Component {

    render() {
        const scanDirs = this.props.dirs.map((dir,index) => {
            return <ScanDirectory dirPath={dir} key={uuidV4()} />;
        })
        return (
            <div>
                <h4>List of Directories to Scan</h4>
                <button className="btn btn-primary" onClick={this.props.onAddDir}>Add Directory</button>
                <ul className="list-group">
                    {scanDirs}
                </ul>
            </div>
        );
    }
}