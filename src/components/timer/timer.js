import React, { Component } from 'react';

class Timer extends Component {
    state = {
        secondsElapsed: 0
    }
    
    clock() {
        this.setState({ secondsElapsed: this.state.secondsElapsed + 1 });
    }
    componentDidMount() {
        this.interval = setInterval(this.clock.bind(this), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    render() {
        return (
            <div style={{fontSize: '10px'}}> (Time Elapsed: {this.state.secondsElapsed} seconds)</div>
        );
    }
}
export default Timer;