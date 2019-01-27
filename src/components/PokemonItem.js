import React, { Component } from 'react';
import { Link } from "react-router-dom";

class PokemonItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="w3-half">
                <Link to={"/details/" + this.props.obj.id} >
                    <div className="w3-display-container myStyle">
                        <img id={this.props.obj.name} className="pokemonItem w3-padding ml-5" src={this.props.obj.image_url} alt="Cinque Terre"/>
                        <span className="w3-display-bottomright w3-padding">{this.props.obj.name}</span>
                        <span className="w3-display-bottomleft w3-padding">#{this.props.obj.id}</span>
                    </div>
                </Link>
            </div>
        );
    }
}

export default PokemonItem;