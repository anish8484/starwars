import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as api from '../../shared/api.js';
import * as util from '../../shared/util.js';
import * as actions from './actions.js';
import * as authenticationActions from '../login/actions.js';
import Search from './search.js';
import Result from './result.js';

class Dashboard extends Component {
    state = {
            input: '',
            fullInfoFilter: {},
            planets: [],
            lastSearchTime: 0,
            secondsElapsed: 0,
            error: ''
    };
    handleSearch = this.handleSearch.bind(this);
    showPlanetInfo = this.showPlanetInfo.bind(this);
    

    componentDidMount() {
        this.interval = setInterval(this.clock.bind(this), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    clock() {
        this.setState({ secondsElapsed: this.state.secondsElapsed + 1 });
    }

    fetchApi(input, uri, results) {
        api.getPlanetSuggestions(input, uri, (response) => {
            if (response != null && response.body != null) {
                const resultNode = response.body;
                results = [...results].concat(resultNode.results || []);
                this.setState({ planets: results });
                if (resultNode.next) {
                    this.fetchApi('', resultNode.next, results);
                }
            }
        });
    }

    handleSearch(event) {
        const input = event.target.value;
        const {lastSearchTime} = this.state;
        const diff = this.state.secondsElapsed - lastSearchTime;
        let planets = [];
        const error = (this.props.user.username !== 'Luke Skywalker' && this.props.counter > 15 && diff < 60) && util.timeMsg;
        if (input !== null && input.trim() !== '' && !error) {
            this.props.incrementSearchCount(this.props.counter + 1);
            this.fetchApi(input, util.planetsApi, []);
            this.setState({ input, lastSearchTime: this.state.secondsElapsed, error: '' });
        } else {
            this.setState({ input, planets, error });
        }
    }

    showPlanetInfo(name) {
        const fullInfoFilter = { ...this.state.fullInfoFilter, [name]: !this.state.fullInfoFilter[name]};
        this.setState({ fullInfoFilter });
    }

    render() {
        if (!this.props.isLoggedIn || !this.props.location.state.isLoggedIn) {
            return <Redirect to={{
                pathname: '/login',
                state: { isLoggedIn: this.props.isLoggedIn }
            }} />;
        } else {
            return (
                <div className="container-fluid">
                    <Search
                        searchTxt={this.state.input}
                        handleSearch={this.handleSearch}
                    />
                    <Result
                        rowdata={this.state.planets}
                        error={this.state.error}
                        fullInfoFilter={this.state.fullInfoFilter}
                        showPlanetInfo={this.showPlanetInfo}
                    />
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
  return {
      counter: state.dashboardReducer.counter,
      user: state.authenticationReducer.user,
      isLoggedIn: state.authenticationReducer.isLoggedIn
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
      incrementSearchCount: actions.incrementSearchCount,
      authenticateUser: authenticationActions.authenticateUser
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);