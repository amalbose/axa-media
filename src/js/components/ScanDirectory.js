import React from 'react';

export default class ScanDirectory extends React.Component {

    render() {
        return (
              <li className="list-group-item">
                   <span className="glyphicon glyphicon-remove pull-right" aria-hidden="true"></span>
                {this.props.dirPath}
              </li>
        );
    }
}