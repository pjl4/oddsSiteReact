import React from 'react';
import './App.css';
import Home from './components/home/Home';
import Nav from './components/nav/Nav';
import Sports from './components/sports/Sports';
const axios = require('axios');
const url = `https://api.the-odds-api.com/v3/sports/?apiKey=${process.env.REACT_APP_ODDS_API_KEY}`;
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            homePage: true,
            sports: [1, 2, 3, 4, 5, 6, 7, 8, 9]
        };
    }
    componentDidMount() {
        axios
            .get(url)
            .then(res => this.setState({ sports: res }))
            .catch(error => console.log(error));
    }
    toggleHome = () => this.setState({ homePage: !this.state.homePage });
    render() {
        return (
            <div className="App">
                <Nav toggleHome={this.toggleHome}></Nav>
                <main>{this.state.homePage && <Home></Home>}</main>
                <section className="sports">
                    {this.state.sports.length &&
                        this.state.sports.map((sport, index) => (
                            <Sports index={index} sport={sport}></Sports>
                        ))}
                </section>
            </div>
        );
    }
}

export default App;
