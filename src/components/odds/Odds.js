import React, { Component } from 'react';
import './odds.css';
import Calculation from '../calculation/Calculation';
class Odds extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isHidden: true
		};
	}
	setVisible = () => {
		this.setState({ isHidden: !this.state.isHidden });
	};
	render() {
		if (this.props.game) {
			const lines = this.props.game.lines;
			let game = this.props.game;
			if (lines === 3) {
				return (
					<section className="gameOdds">
						<div className="container">
							<div className="row">
								<table>
									<caption>
										Date of event: {game.startTime}
									</caption>
									<thead>
										<td>Teams</td>
										<td>Odds</td>
										<td>Sites</td>
										<td>Percent</td>
										<td>Open Bet Sheet</td>
									</thead>
									<tbody>
										<tr>
											<td>{game.teamOne}</td>
											<td>{game.teamOneOdds}</td>
											<td>{game.teamOneOddsSite}</td>
											<td
												rowSpan="3"
												className={`${game.arbitrageOppurtunity}`}
											>
												{game.arbitragePercent}
											</td>
										</tr>
										<tr>
											<td>{game.teamTwo}</td>
											<td>{game.teamTwoOdds}</td>
											<td>{game.teamTwoOddsSite}</td>
										</tr>
										<tr>
											<td>Draw</td>
											<td>{game.drawOdds}</td>
											<td>{game.drawOddsSite}</td>
											<button onClick={this.setVisible}>
												Bet Sheet
											</button>
										</tr>
									</tbody>
								</table>
								{!this.state.isHidden && (
									<Calculation game={game} />
								)}
							</div>
						</div>
					</section>
				);
			} else {
				return (
					<section className="gameOdds">
						<div className="container">
							<div className="row">
								<table>
									<caption>
										Date of event: {game.startTime}
									</caption>
									<thead>
										<tr>
											<th>Teams</th>
											<th>Odds</th>
											<th>Sites</th>
											<th>Percent</th>
											<td>Open Bet Sheet</td>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>{game.teamOne}</td>
											<td>{game.teamOneOdds}</td>
											<td>{game.teamOneOddsSite}</td>
											<td
												rowSpan="2"
												className={`${game.arbitrageOppurtunity}`}
											>
												{game.arbitragePercent}
											</td>
										</tr>
										<tr>
											<td>{game.teamTwo}</td>
											<td>{game.teamTwoOdds}</td>
											<td>{game.teamTwoOddsSite}</td>
											<button onClick={this.setVisible}>
												Bet Sheet
											</button>
										</tr>
									</tbody>
								</table>
								{!this.state.isHidden && (
									<Calculation game={game} />
								)}
							</div>
						</div>
					</section>
				);
			}
		} else {
			return <h1>No sites to get odds from.</h1>;
		}
	}
}

export default Odds;
