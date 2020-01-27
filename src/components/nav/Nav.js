import React, { Component } from 'react';
import Login from '../login/Login';
import './nav.css';

class Nav extends Component {
    render() {
        return (
            <header>
                <div className="row">
                    <h1
                        onClick={this.props.toggleHome}
                        className="eight columns"
                    >
                        Sports Odds Site
                    </h1>
                    <Login></Login>
                </div>
            </header>
        );
    }
}

export default Nav;
