import React, { Component } from 'react'
import 'bulma/css/bulma.css';

export class FoodBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 0,
        }
    }

    handleInput = () => {
        this.setState({
            quantity: this.state.quantity + 1,
        })
    }

    handleClick = () => {
        this.props.addTodaysFood(this.props);
    }

    render() {
        const { name, calories, image } = this.props.food;
        console.log('render foodBox')

        return (
            <div className="box text-left margin-bottom">
            <article className="media">
                <div className="media-left">
                <figure className="image is-64x64">
                    <img src={image} alt={name} />
                </figure>
                </div>
                <div className="media-content">
                <div className="content">
                    <p>
                    <strong>{name}</strong> <br />
                    <small>{calories} cal</small>
                    </p>
                </div>
                </div>
                <div className="media-right">
                <div className="field has-addons">
                    <div className="control">
                    <input 
                        className="input" 
                        type="number" 
                        value={this.state.quantity}
                        onChange={this.handleInput} 
                    />
                    </div>
                    <div className="control">
                    <button className="button is-info" onClick={this.handleClick}>
                        +
                    </button>
                     </div>
                </div>
                </div>
            </article>
            </div>
        )
    }
}

export default FoodBox
