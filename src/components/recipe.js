import React, { Component } from 'react'
import { Pot } from '../components.js'
import './../global.scss'

export default class Recipe extends Component {
    
    constructor(props) {

        super(props);

        this.state = {
            pots: [<Pot className="add-pot"/>]
        };

    }

    componentDidMount() {

        window.RECIPE = this;

    }
    
    addPot() {
        
        const newPot = <Pot
            key={ this.state.pots.length }
        />;

        this.setState({ 
            pots: [...this.state.pots, newPot] 
        });

    }

    render() {

        const { pots } = this.state;

        console.log(pots);

        return (

            <div className="recipe">

                <div className="stove">
                    { pots }
                </div>
        
            </div>

        );

    }

}