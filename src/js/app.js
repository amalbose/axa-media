import React from 'react';

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            time: Date()
        }
        this.startTimer();
    }

    startTimer() {
        window.setInterval(() => {
            this.setState({
                time: Date()
            })
        }, 1000)
    }

    render() {
        return (
            <h1> { this.state.time } </h1>
        );
    }
}

export default App;