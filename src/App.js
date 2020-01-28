import React from 'react';
import './App.css';
import Home from './components/home/Home';
import Nav from './components/nav/Nav';
import Odds from './components/odds/Odds';
const axios = require('axios');
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			clickedSport: null,
			games: [],
			formattedGames: []
		};
	}
	setClickedSport = (clickedSport) => {
		this.setState({ clickedSport }, () => {
			this.callToAPI(clickedSport);
			this.setFormattedGames();
			console.log('formatted', this.state.formattedGames);
		});
	};
	setFormattedGames = () => {
		let formatedGames = this.formatGamesObject();
		this.setState({ formatedGames: formatedGames });
	};
	callToAPI = (sportName) => {
		const url = `https://api.the-odds-api.com/v3/odds/?apiKey=${process.env.REACT_APP_ODDS_API_KEY}&sport=${sportName}&region=us&market=h2h`;
		axios
			.get(url)
			.then((res) => {
				this.setState({ games: res.data.data });
				console.log(res);
			})
			.catch((error) => console.log(error));
	};
	render() {
		return (
			<div className="App">
				<Nav></Nav>
				<Home setClickedSport={this.setClickedSport}></Home>
				{this.state.formattedGames.length > 0 &&
					this.state.formattedGames.map((game, index) => (
						<Odds key={index} game={game}></Odds>
					))}
			</div>
		);
	}
	formatGamesObject = () => {
		let formattedGames = [];
		let games = this.state.games;
		console.log('state games', this.state.games);
		let currentGame;
		for (let i = 0; i < games; i++) {
			let lines = games[i].sites[0].odds.h2h;
			if (lines === 3) {
				currentGame = this.createThreeLinesObject(games[i]);
				currentGame.lines = 3;
			} else {
				currentGame = this.createTwoLinesObject(games[i]);
				currentGame.lines = 2;
			}
			currentGame.startTime = this.getCurrentTime(games[i].commence_time);
			formattedGames.push(currentGame);
		}
		return formattedGames;
	};
	getCurrentTime = (unixTime) => {
		let dateObj = new Date(unixTime * 1000);
		let utcString = dateObj.toUTCString();
		let time = utcString.slice(-11, -4);
		return time;
	};
	threeWayOddsCalculation = (oneOdds, twoOdds, drawOdds) => {
		const onePercent = 1 / oneOdds;
		const twoPercent = 1 / twoOdds;
		const drawPercent = 1 / drawOdds;

		return (onePercent + twoPercent + drawPercent) * 100;
	};
	twoWayOddsCalculation = (oneOdds, twoOdds, drawOdds) => {
		const onePercent = 1 / oneOdds;
		const twoPercent = 1 / twoOdds;
		return (onePercent + twoPercent) * 100;
	};

	createThreeLinesObject(game) {
		let currentGame = {};
		currentGame.teamOne = game.teams[0];
		currentGame.teamTwo = game.teams[1];
		currentGame.teamOneOdds = 0;
		currentGame.teamTwoOdds = 0;
		currentGame.drawOdds = 0;
		for (let site in game.site) {
			if (site.odds.h2h[0] > currentGame.teamOneOdds) {
				currentGame.teamOneOdds = site.odds.h2h[0];
				currentGame.teamOneOddsSite = site.site_nice;
			}
			if (site.odds.h2h[1] > currentGame.teamTwoOdds) {
				currentGame.teamTwoOdds = site.odds.h2h[1];
				currentGame.teamTwoOddsSite = site.site_nice;
			}
			if (site.odds.h2h[2] > currentGame.drawOdds) {
				currentGame.drawOdds = site.odds.h2h[2];
				currentGame.drawOddsSite = site.site_nice;
			}
		}
		currentGame.arbitragePercent = this.threeWayOddsCalculation(
			currentGame.teamOneOdds,
			currentGame.teamTwoOdds,
			currentGame.drawOdds
		);
		if (currentGame.arbitragePercent > 100) {
			currentGame.arbitrageOppurtunity = true;
		} else {
			currentGame.arbitrageOppurtunity = false;
		}
		return currentGame;
	}
	createTwoLinesObject(game) {
		let currentGame = {};
		currentGame.teamOne = game.teams[0];
		currentGame.teamTwo = game.teams[1];
		currentGame.teamOneOdds = 0;
		currentGame.teamTwoOdds = 0;
		for (let site in game.site) {
			if (site.odds.h2h[0] > currentGame.teamOneOdds) {
				currentGame.teamOneOdds = site.odds.h2h[0];
				currentGame.teamOneOddsSite = site.site_nice;
			}
			if (site.odds.h2h[1] > currentGame.teamTwoOdds) {
				currentGame.teamTwoOdds = site.odds.h2h[1];
				currentGame.teamTwoOddsSite = site.site_nice;
			}
		}
		currentGame.arbitragePercent = this.twoWayOddsCalculation(
			currentGame.teamOneOdds,
			currentGame.teamTwoOdds
		);
		if (currentGame.arbitragePercent > 100) {
			currentGame.arbitrageOppurtunity = true;
		} else {
			currentGame.arbitrageOppurtunity = false;
		}
		return currentGame;
	}
}

export default App;
