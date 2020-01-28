import React, { Component } from 'react';
import './sports.css';

class Sports extends Component {
	render() {
		return (
			<button
				onClick={() => this.props.setClickedSport(this.props.sport.key)}
				className="four columns"
			>
				{this.props.sport.title}
			</button>
		);
	}
}

export default Sports;
