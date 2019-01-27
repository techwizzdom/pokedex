import React, { Component } from 'react';

class MyPokemonItem extends Component {
    constructor (props) {
        super(props);
    }

    render() {
        console.log(this.props);
        return (
            <tr>
                <td>
                    <div className="w3-display-container myStyle">
                        <img id={this.props.obj.name} className="pokemonItem mr-5" src={this.props.obj.image_url} alt="Cinque Terre"/>
                        <span className="w3-display-bottomright">{this.props.obj.name}</span>
                        <button className="ml-5 btn btn-danger" onClick={() => this.props.removePokemon(this.props.obj.id)}>Remove</button>
                    </div>
                </td>
            </tr>
        );
    }
}

export default MyPokemonItem;