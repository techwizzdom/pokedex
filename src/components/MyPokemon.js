import React, { Component } from 'react';
import axios from "axios";
import Cookies from 'universal-cookie';

import MyPokemonItem from './MyPokemonItem';

class MyPokemon extends Component {
    constructor(props) {
        super(props);

        this.state = { pokemon: []}
    }

    capitalizeFirstLetter = string => {
        return string.charAt(0).toUpperCase() + string.substr(1);
    }

    getPokemonUrls = () => {
        const cookies = new Cookies();
        let urls = [];
        Object.keys(cookies.getAll()).forEach((id) => {
            console.log(`IDID ID : ${id}`);
        });
        Object.keys(cookies.getAll()).forEach(id => urls.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)));
        return urls;
    }

    componentDidMount = () => {
        const pokemonUrls = this.getPokemonUrls();
        let pokemon = [];
        for (let i = 0; i < pokemonUrls.length; i++) {
            pokemonUrls[i]
            .then(response => {
                let abilities = [];
                response.data.abilities.forEach(element => {
                    abilities.push(this.capitalizeFirstLetter(element.ability.name));
                });
                let moves = [];
                response.data.moves.forEach(element => {
                    moves.push(this.capitalizeFirstLetter(element.move.name));
                });
                let stats = [];
                response.data.stats.forEach(element => {
                    stats.push(`${this.capitalizeFirstLetter(element.stat.name)}: ${element.base_stat}`)
                });
                let types = [];
                response.data.types.forEach(element => {
                    types.push(this.capitalizeFirstLetter(element.type.name));
                });
                const image_url = response.data.sprites.front_default;
                const name = this.capitalizeFirstLetter(response.data.forms[0].name);
                const pokemonObj = {
                    id: response.data.id,
                    name: name,
                    abilities: abilities,
                    moves: moves,
                    stats: stats,
                    types: types,
                    image_url: image_url
                }
                pokemon.push(pokemonObj);
                this.setState({ pokemon: pokemon });
            })
            .catch(function(error) {
            console.log(error);
            });
        }
    }

    removePokemon = (id) => {
        const cookies = new Cookies();
        cookies.remove(id);
        let myArray = this.state.pokemon.filter((obj) => obj.id !== id);
        this.setState({ pokemon: myArray })
    }

    populateRow = () => {
        return this.state.pokemon.map((obj, i) => {
            return (
                <MyPokemonItem 
                    obj={obj}
                    key={obj.id}
                    removePokemon={this.removePokemon}
                />
            );
        });
    }

    render() {
        for (let i = 0; i < this.state.pokemon; i++) {
            console.log(this.state.pokemon[i]);
        }
        /*
        const cookies = new Cookies();
        console.log(cookies.getAll());
        cookies.remove('Wartortle')
        cookies.remove('8')
        cookies.remove('13')
        cookies.remove('Weedle')
        */
        return (
            <div className="w3-bar w3-white w3-border-bottom w3-xlarge">
                <table className="table myStyle myPokemonTable">
                    <thead>
                        <tr>
                            <th>{this.state.pokemon.length} Pokemon{this.state.pokemon.length === 1 ? ' ' : 's'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.populateRow()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default MyPokemon;