import React, { Component } from 'react';
import './odds.css';

class Odds extends Component {
	render() {
		const lines = this.props.game.lines;
		let game = this.props.game;
		if (lines === 3) {
			return (
				<section className="gameOdds">
					<div className="container">
						<div className="row">
							<table>
								<caption>Start Time: {game.startTime}</caption>
								<thead>
									<td>Teams</td>
									<td>Odds</td>
									<td>Sites</td>
									<td>Percent</td>
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
									</tr>
								</tbody>
							</table>
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
								<caption>Start Time: {game.startTime}</caption>
								<thead>
									<tr>
										<th>Teams</th>
										<th>Odds</th>
										<th>Sites</th>
										<th>Percent</th>
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
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</section>
			);
		}
	}
}

export default Odds;
