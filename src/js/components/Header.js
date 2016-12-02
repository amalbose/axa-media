import React from 'react';

export default class Header extends React.Component {

    render() {
        return (
            <div>
                <h1>{this.props.headerTitle}</h1>
            </div>
        );
    }
}