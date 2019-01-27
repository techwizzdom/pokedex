import React, { Component } from 'react';

class DetailRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>{this.props.asset}</td>
            </tr>
        );
    }
}

export default DetailRow;