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
            games: []
        };
    }
    callToAPI = sportName => {
        const url = `https://api.the-odds-api.com/v3/odds/?apiKey=${process.env.REACT_APP_ODDS_API_KEY}&sport=${sportName}&region=us&market=h2h`;
        axios
            .get(url)
            .then(res => this.setState({ games: res.data }))
            .catch(error => console.log(error));
    };

    render() {
        return (
            <div className="App">
                <Nav></Nav>
                <Home></Home>
                {this.state.games.length && (
                    <Odds games={this.state.games}></Odds>
                )}
            </div>
        );
    }
}

export default App;
