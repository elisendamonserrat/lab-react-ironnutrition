import React from 'react';
import { Component } from 'react';
import './App.css';
import 'bulma/css/bulma.css';
import FoodBox from './components/FoodBox';
import foods from './foods.json';
import AddFoodInput from './components/AddFoodInput';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodList: foods,


    };
  }

  addFood = (newFood) => {
    const initialFoodList = [...this.state.foodList];
    const { name, calories, image } = newFood;
    console.log(newFood)

    initialFoodList.push({
      "name": name ,
      "calories": calories,
      "image": "https://i.imgur.com/eTmWoAN.png",
      "quantity": 0
    })

    this.setState({
      foodList: initialFoodList,
    })
    console.log(this.state)
  }

  render() {
    return (
      <div className="App text-center">
        <h1 className="title is-1">IronNutrition</h1>
        < AddFoodInput onAddFood={this.addFood} />
        {this.state.foodList.map((food, index) => {
          return(
            < FoodBox 
                key={index}
                food={food}
                id={index}
            />
          )
        })
        }
      </div>
    );
  }
}

export default App;
