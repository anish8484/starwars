import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authenticationActions from '../login/actions.js';
import Timer from '../timer/timer.js';

class Header extends Component {
    handleLogout = this.handleLogout.bind(this);

    handleLogout(e) {
        e.preventDefault();
        this.props.authenticateUser(false);
    };

    render() {
        return (
            <header className="header">
                <div className="user">
                    <div>
                        Welcome {this.props.user && this.props.user.username}
                    </div>                
                </div>
                <div className="logout">
                    <button type="submit" onClick={e => this.handleLogout(e)}>LOGOUT</button>
                    <Timer />                    
                </div>
                
            </header>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.authenticationReducer.user
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        authenticateUser: authenticationActions.authenticateUser
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);