import React, { Component } from 'react'
import 'bulma/css/bulma.css';


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
        if( this.state.name === "" || this.state.calories === "" ) {
            alert('Please fill all the fields of the form')
        }
        this.props.onAddFood(this.state);
    }

    render() {
        const { name, calories, image } = this.state;

        return (
        <div className="modal modal-card ">
                <input
                   className="input margin-bottom-small"
                   type="text"
                   name="name"
                   value={name}
                   placeholder="Name of the food"
                   onChange={this.handleInput}
                />
                <input
                   className="input margin-bottom-small"
                   type="text"
                   name="calories"
                   value={calories}
                   placeholder="Total amount calories"
                   onChange={this.handleInput}
                />
                <input
                   className="input margin-bottom-small"
                   type="text"
                   name="image"
                   value={image}
                   placeholder="Image of the food"
                   onChange={this.handleInput}
                />
            <button className="button is-success margin-bottom" onClick={this.handleClick}> Add food </button>
        </div>
        )
    }
}

export default AddFoodInput
