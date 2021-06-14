import React, { Component } from 'react'

export class AddFoodInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: '',
          calories: '',
          image:''
        };
    }

    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleClick = () => {
        this.props.onAddFood(this.state);
    }

    render() {
        const { name, calories, image } = this.state;

        return (
            <div className="container ">
                <input
                   className="input column is-4 is-offset-4"
                   type="text"
                   name="name"
                   value={name}
                   placeholder="Name of the food"
                   onChange={this.handleInput}
                />
                <input
                   className="input column is-4 is-offset-4"
                   type="text"
                   name="calories"
                   value={calories}
                   placeholder="Total amount calories"
                   onChange={this.handleInput}
                />
                <input
                   className="input column is-4 is-offset-4"
                   type="text"
                   name="image"
                   value={image}
                   placeholder="Image of the food"
                   onChange={this.handleInput}
                />

            <button className="button" onClick={this.handleClick}> Add food </button>
            </div>
        )
    }
}

export default AddFoodInput
