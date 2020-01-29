import React from 'react';
import './App.css';
import Home from './components/home/Home';
import Nav from './components/nav/Nav';
import Odds from './components/odds/Odds';
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/core';
const override = css`
	display: block;
	margin: 0 auto;
	border-color: red;
`;
const axios = require('axios');
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			clickedSport: null,
			games: [],
			formattedGames: [],
			loading: false
		};
	}
	setClickedSport = (clickedSport) => {
		this.setState({ clickedSport, loading: true, games: [] }, async () => {
			try {
				await this.callToAPI(clickedSport);
				await this.setFormattedGames();
			} catch (error) {
				console.log(error);
			}
		});
	};
	setFormattedGames = async () => {
		let formattedGames = await this.formatGamesObject();
		this.setState({ formattedGames: formattedGames, loading: false });
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
				{this.state.loading && (
					<ClipLoader
						css={override}
						size={100}
						color={'#red'}
						loading={this.state.loading}
					/>
				)}
				<div className="container">
					{this.state.games.length === 0 && (
						<h1>No Odds data to display</h1>
					)}
				</div>
			</div>
		);
	}
	formatGamesObject = async () => {
		this.setState({ formattedGames: [] });
		let formattedGames = [];
		let games = this.state.games;
		let currentGame;
		for (let i = 0; i < games.length; i++) {
			if (games[i].sites_count > 0) {
				let lines = games[i].sites[0].odds.h2h.length;
				if (lines === 3) {
					currentGame = this.createThreeLinesObject(games[i]);
					currentGame.lines = 3;
				} else {
					currentGame = this.createTwoLinesObject(games[i]);
					currentGame.lines = 2;
				}
				currentGame.startTime = this.getCurrentTime(
					games[i].commence_time
				);
				formattedGames.push(currentGame);
			} else {
			}
		}
		return formattedGames;
	};
	async callToAPI(sportName) {
		const url = `https://api.the-odds-api.com/v3/odds/?apiKey=${process.env.REACT_APP_ODDS_API_KEY}&sport=${sportName}&region=us&market=h2h`;
		await axios
			.get(url)
			.then((res) => {
				this.setState({ games: res.data.data });
			})
			.catch((error) => console.log(error));
	}
	getCurrentTime = (unixTime) => {
		let dateObj = new Date(unixTime * 1000);
		let time = dateObj.toDateString();
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
		for (let i = 0; i < game.sites.length; i++) {
			if (game.sites[i].odds.h2h[0] > currentGame.teamOneOdds) {
				currentGame.teamOneOdds = game.sites[i].odds.h2h[0];
				currentGame.teamOneOddsSite = game.sites[i].site_nice;
			}
			if (game.sites[i].odds.h2h[1] > currentGame.teamTwoOdds) {
				currentGame.teamTwoOdds = game.sites[i].odds.h2h[1];
				currentGame.teamTwoOddsSite = game.sites[i].site_nice;
			}
			if (game.sites[i].odds.h2h[2] > currentGame.drawOdds) {
				currentGame.drawOdds = game.sites[i].odds.h2h[2];
				currentGame.drawOddsSite = game.sites[i].site_nice;
			}
		}
		currentGame.arbitragePercent = this.threeWayOddsCalculation(
			currentGame.teamOneOdds,
			currentGame.teamTwoOdds,
			currentGame.drawOdds
		);
		if (currentGame.arbitragePercent > 100) {
			currentGame.arbitrageOppurtunity = false;
		} else {
			currentGame.arbitrageOppurtunity = true;
		}
		return currentGame;
	}
	createTwoLinesObject(game) {
		let currentGame = {};
		currentGame.teamOne = game.teams[0];
		currentGame.teamTwo = game.teams[1];
		currentGame.teamOneOdds = 0;
		currentGame.teamTwoOdds = 0;
		for (let i = 0; i < game.sites.length; i++) {
			if (game.sites[i].odds.h2h[0] > currentGame.teamOneOdds) {
				currentGame.teamOneOdds = game.sites[i].odds.h2h[0];
				currentGame.teamOneOddsSite = game.sites[i].site_nice;
			}
			if (game.sites[i].odds.h2h[1] > currentGame.teamTwoOdds) {
				currentGame.teamTwoOdds = game.sites[i].odds.h2h[1];
				currentGame.teamTwoOddsSite = game.sites[i].site_nice;
			}
		}
		currentGame.arbitragePercent = this.twoWayOddsCalculation(
			currentGame.teamOneOdds,
			currentGame.teamTwoOdds
		);
		if (currentGame.arbitragePercent > 100) {
			currentGame.arbitrageOppurtunity = false;
		} else {
			currentGame.arbitrageOppurtunity = true;
		}
		return currentGame;
	}
}

export default App;
