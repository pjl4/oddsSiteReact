import React, { Component } from 'react';
import './calculation.css';

class Calculation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: null,
			winnings: null,
			teamOneBetAmount: null,
			teamTwoBetAmount: null,
			drawBetAmount: null
		};
	}
	onChange = (evt) => {
		this.setState({ value: evt.target.value });
	};
	calculateWinnings = (evt) => {
		evt.preventDefault();
		let value = this.state.value;
		if (this.props.game.lines === 3) {
			let teamOneBetPercent = (1 / this.props.game.teamOneOdds) * 100;
			let teamTwoBetPercent = (1 / this.props.game.teamTwoOdds) * 100;
			let drawBetPercent = (1 / this.props.game.drawOdds) * 100;

			let teamOneBetAmount =
				(value * teamOneBetPercent) / this.props.game.arbitragePercent;
			let teamTwoBetAmount =
				(value * teamTwoBetPercent) / this.props.game.arbitragePercent;
			let drawBetAmount =
				(value * drawBetPercent) / this.props.game.arbitragePercent;
			let winnings =
				(value / this.props.game.arbitragePercent) * 100 - value;
			this.setState({
				teamOneBetAmount,
				teamTwoBetAmount,
				drawBetAmount,
				winnings
			});
		} else {
			let teamOneBetPercent = (1 / this.props.game.teamOneOdds) * 100;
			let teamTwoBetPercent = (1 / this.props.game.teamTwoOdds) * 100;

			let teamOneBetAmount =
				(value * teamOneBetPercent) / this.props.game.arbitragePercent;
			let teamTwoBetAmount =
				(value * teamTwoBetPercent) / this.props.game.arbitragePercent;
			let winnings =
				(value / this.props.game.arbitragePercent) * 100 - value;
			this.setState({ teamOneBetAmount, teamTwoBetAmount, winnings });
		}
	};
	render() {
		let game = this.props.game;
		const lines = this.props.game.lines;
		if (lines === 2) {
			return (
				<div className="container">
					<h4>Calculation</h4>
					<form>
						<formgroup>
							<label htmlFor="stake">Enter Total Stake:</label>
							<input
								onChange={this.onChange}
								name="stake"
								placeholder="100"
							></input>
							<button onClick={this.calculateWinnings}>
								Calculate
							</button>
						</formgroup>
						<formgroup>
							<label htmlFor="teamOneOdds">{game.teamOne}</label>
							<input
								name="teamOneOdds"
								readOnly
								value={game.teamOneOdds}
							></input>
							{this.state.teamOneBetAmount && (
								<input
									className="wager"
									readOnly
									value={`Wager: ${this.state.teamOneBetAmount}`}
								></input>
							)}
						</formgroup>
						<formgroup>
							<label htmlFor="teamTwoOdds">{game.teamTwo}</label>
							<input
								name="teamTwoOdds"
								readOnly
								value={game.teamTwoOdds}
							></input>
							{this.state.teamTwoBetAmount && (
								<input
									className="wager"
									readOnly
									value={`Wager: ${this.state.teamTwoBetAmount}`}
								></input>
							)}
						</formgroup>
						<formgroup>
							{this.state.winnings && (
								<input
									className={`${game.arbitrageOppurtunity}`}
									readOnly
									value={`Profit: ${this.state.winnings}`}
								></input>
							)}
						</formgroup>
					</form>
				</div>
			);
		} else {
			return (
				<div className="container">
					<h4>Calculation</h4>
					<form>
						<formgroup>
							<label htmlFor="stake">Enter Total Stake:</label>
							<input
								onChange={this.onChange}
								name="stake"
								placeholder="100"
							></input>
							<button onClick={this.calculateWinnings}>
								Calculate
							</button>
						</formgroup>
						<formgroup>
							<label htmlFor="teamOneOdds">{game.teamOne}</label>
							<input
								name="teamOneOdds"
								readOnly
								value={game.teamOneOdds}
							></input>
							{this.state.teamOneBetAmount && (
								<input
									className="wager"
									readOnly
									value={`Wager: ${this.state.teamOneBetAmount}`}
								></input>
							)}
						</formgroup>
						<formgroup>
							<label htmlFor="teamTwoOdds">{game.teamTwo}</label>
							<input
								name="teamTwoOdds"
								readOnly
								value={game.teamTwoOdds}
							></input>
							{this.state.teamTwoBetAmount && (
								<input
									className="wager"
									readOnly
									value={`Wager: ${this.state.teamTwoBetAmount}`}
								></input>
							)}
						</formgroup>
						<formgroup>
							<label htmlFor="drawOdds">Draw</label>
							<input
								name="drawOdds"
								readOnly
								value={game.drawOdds}
							></input>
							{this.state.drawBetAmount && (
								<input
									className="wager"
									readOnly
									value={`Wager: ${this.state.drawBetAmount}`}
								></input>
							)}
						</formgroup>
						<formgroup>
							{this.state.winnings && (
								<input
									className={`${game.arbitrageOppurtunity}`}
									readOnly
									value={`Profit: ${this.state.winnings}`}
								></input>
							)}
						</formgroup>
					</form>
				</div>
			);
		}
	}
}

export default Calculation;
