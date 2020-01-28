import React, { Component } from 'react';

class Odds extends Component {
	render() {
		const lines = this.props.game.lines;

		if (lines === 3) {
			return <section className="gameOdds"></section>;
		} else {
			return <section className="gameOdds"></section>;
		}
	}
}

export default Odds;
