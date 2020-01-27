import React, { Component } from 'react';
import './sports.css';

class Sports extends Component {
    render() {
        return (
            <button data-set={this.props.index} className="three columns">
                Sport Name
            </button>
        );
    }
}

export default Sports;
