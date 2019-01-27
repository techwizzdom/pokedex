import React, { Component } from 'react';
import axios from "axios";
import PokemonItem from './PokemonItem';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = { pokemon: [], pokemonUrls: [] };
        this.capitalizeFirstLetter = this.capitalizeFirstLetter.bind(this);
    }

    getPokemonUrls = () => {
        let urls = [];
        for (let i = 1; i < 150; i++) {
            urls.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}/`));
        }
        return urls;
    }

    capitalizeFirstLetter = string => {
        return string.charAt(0).toUpperCase() + string.substr(1);
    }
    
    componentDidMount = () => {
        if (this.state.pokemon.length === 0) {
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
                    pokemon.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)); 
                    this.setState({ pokemon: pokemon });
                })
                .catch(function(error) {
                console.log(error);
                });
            }
        }
    }

    pokemonItem = () => {
        return this.state.pokemon.map((obj, i) => {
            return (
                <PokemonItem 
                    obj={obj}
                    key={obj.id}
                />
            );
        });
    }

    render() {
        return (
            <div className="w3-bar w3-white w3-border-bottom w3-xlarge">
                {this.pokemonItem()}
            </div>
        );
    }
}

export default Index;