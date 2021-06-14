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

    };
  }

  addFood = () => {
    console.log('update state and add new food to the array')
  }

  render() {
    return (
      <div className="App text-center">
        <h1 className="title is-1">IronNutrition</h1>
        < AddFoodInput onAddFood={this.addFood} />
        {foods.map((food, index) => {
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
