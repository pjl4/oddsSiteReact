import React, { Component } from 'react';
import Sports from '../sports/Sports';
const axios = require('axios');
const url = `https://api.the-odds-api.com/v3/sports/?apiKey=${process.env.REACT_APP_ODDS_API_KEY}`;
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sports: [1, 2, 3, 4, 5, 6, 7]
        };
    }
    componentDidMount() {
        console.log('component did mount');
        axios
            .get(url)
            .then(res => this.setState({ sports: res }))
            .catch(error => console.log(error));
    }
    render() {
        return (
            <section className="sports">
                {this.state.sports.length &&
                    this.state.sports.map((sport, index) => (
                        <Sports key={index} sport={sport}></Sports>
                    ))}
            </section>
        );
    }
}

export default Home;
