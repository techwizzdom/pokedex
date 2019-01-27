import React, { Component } from 'react';
import axios from "axios";
import DetailRow from './DetailRow';
import Cookies from 'universal-cookie';

class Details extends Component {
    constructor(props) {
        super(props);
        this.populateTable = this.populateTable.bind(this);
        this.state = { pokemon: {} }
    }

    capitalizeFirstLetter = string => {
        return string.charAt(0).toUpperCase() + string.substr(1);
    }

    componentDidMount = () => {
        const arr = this.props.location.pathname.split('/');
        axios.get(`https://pokeapi.co/api/v2/pokemon/${arr[arr.length - 1]}/`)
        .then(response => {
            let abilities = [];
            response.data.abilities.forEach(element => {
                abilities.push(this.capitalizeFirstLetter(element.ability.name));
            });
            let moves = [];
            response.data.moves.forEach(element => {
                moves.push(element.move.name);
            });
            let stats = [];
            response.data.stats.forEach(element => {
                stats.push(`${element.stat.name}: ${element.base_stat}`)
            });
            let types = [];
            response.data.types.forEach(element => {
                types.push(element.type.name);
            });
            const image_url = response.data.sprites.front_default;
            const name = this.capitalizeFirstLetter(response.data.forms[0].name);
            const pokemonObj = {
                id: arr[arr.length - 1],
                name: name,
                abilities: abilities,
                moves: moves,
                stats: stats,
                types: types,
                image_url: image_url
            }
            this.setState({ pokemon: pokemonObj });
        })
        .catch(function(error) {
        console.log(error);
        });
    }

    populateTable = property => {
        return this.state.pokemon[property].map((object, i) => {
            return (
                <DetailRow 
                    asset={object}
                    key={object.id}
                />
            );
        })
    }

    putToMyPokemon = () => {
        console.log('IS in FAVS:')
        console.log(this.state.pokemon);
        const cookies = new Cookies();
        cookies.set(this.state.pokemon.id, this.state.pokemon.id, { path: '/' });
        console.log(`Id : ${this.state.pokemon.id}`)
        console.log(cookies.getAll())
    }

    render() {
        if (this.state.pokemon.types === undefined) {
            return (
                <div className="w3-bar w3-white w3-border-bottom w3-xlarge">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Abilities</th>
                            </tr>
                        </thead>
                        <tbody>
                        
                        </tbody>
                    </table>   
                </div>
            );
        }

        const divStyle = {
            backgroundImage: 'linear-gradient(to bottom right, yellow, orange)'
        }

        return (
            <div className="w3-bar w3-white w3-border-bottom w3-xlarge">
                <div className="w3-display-container" style={divStyle}>
                    <img id={this.state.pokemon.id} className="pokemonItem w3-padding" src={this.state.pokemon.image_url} alt="Cinque Terre"/>
                    <span className="w3-display-bottomright w3-padding">{this.state.pokemon.name}</span>
                </div>
                <div className="w3-bar w3-white w3-border-bottom w3-xlarge putToFavs" style={divStyle} onClick={this.putToMyPokemon}>
                    <a>
                        <img id="abcd" src="https://logos.textgiraffe.com/logos/logo-name/My-designstyle-love-heart-m.png" width="50" height="50" className="ml-5 mt-2 mb-2" alt=""/>
                    </a> 
                </div>
                <table className="table" style={divStyle}>
                    <thead>
                        <tr>
                            <th>Abilities</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.populateTable('abilities')}
                    </tbody>
                </table>   
                <table className="table" style={divStyle}>
                    <thead>
                        <tr>
                            <th>Stats</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.populateTable('stats')}
                    </tbody>
                </table>
                <table className="table" style={divStyle}>
                    <thead>
                        <tr>
                            <th>Types</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.populateTable('types')}
                    </tbody>
                </table>
                <table className="table" style={divStyle}>
                    <thead>
                        <tr>
                            <th>Moves</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.populateTable('moves')}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Details;