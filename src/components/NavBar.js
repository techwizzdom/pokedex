import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
    render() {
        return (
            <div className="w3-bar w3-white w3-border-bottom w3-xlarge">
                <Link to={"/"} className="float-left">
                    <a>
                        <img src="https://img.rankedboost.com/wp-content/uploads/2017/09/Pokemon-GO-GEN-4-Pokedex.png" width="65" height="50" className="d-inline-block align-top ml-3 mt-2 mb-2" alt=""/>
                    </a>
                </Link>
                <Link to={"/mypokemon"} className="float-right">
                    <a>
                        <img src="https://logos.textgiraffe.com/logos/logo-name/My-designstyle-love-heart-m.png" width="50" height="50" className="d-inline-block align-top mt-2 mb-2" alt=""/>
                        <img src="https://vignette.wikia.nocookie.net/fantendo/images/5/58/Pokemon-logo-text-png-7.png/revision/latest?cb=20180719222400" width="130" height="50" className="d-inline-block align-top mr-3 mb-2 mt-2" alt=""/>
                    </a>
                </Link>
            </div>
        );
    }
}

export default NavBar;