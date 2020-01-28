import React, { Component } from 'react';
import Sports from '../sports/Sports';
const axios = require('axios');
const url = `https://api.the-odds-api.com/v3/sports/?apiKey=${process.env.REACT_APP_ODDS_API_KEY}`;
class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sports: []
		};
	}
	componentDidMount() {
		console.log('component did mount');
		axios
			.get(url)
			.then((res) => {
				this.setState({ sports: res.data.data });
			})
			.catch((error) => console.log(error));
	}
	render() {
		return (
			<section className="sports">
				<div className="container">
					{this.state.sports.length > 0 &&
						this.state.sports.map((sport, index) => (
							<Sports
								setClickedSport={this.props.setClickedSport}
								key={sport.key}
								sport={sport}
							></Sports>
						))}
				</div>
			</section>
		);
	}
}

export default Home;
