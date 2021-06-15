import React, { Component } from 'react'

export class TodaysFoodList extends Component {

    handleOnClick = (e) => {
        const foodToDelete = this.props.food;
        this.props.onDelete(foodToDelete)
    }

    render() {
        const { name, quantity, calories } = this.props.food;
        return (
         <li className="margin-bottom-small">
            {quantity} {name} - {calories} cal

            <button className="button-delete margin-left" onClick={this.handleOnClick}>
            <i className="fas fa-trash" style={{color:'red'}}></i>
            </button>
        </li>
        )
    }
}

export default TodaysFoodList
