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
      addFoodForm: false,
      query: '',
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
      addFoodForm: !this.state.addFoodForm,
    })
  }

  showAddFoodForm = () => {
    console.log('show form')
    this.setState({
      addFoodForm: !this.state.addFoodForm,
    })
  }

  filterFood = (foodsArray, query) => {
    if(!query) {
      return foodsArray
    }

    return foodsArray.filter((food) => {
      const foodName = food.name.toLowerCase();
      return foodName.includes(query.toLowerCase())
    })
  }

  handleSearchBarInput = (event) => {
    this.setState({
      query: event.target.value,
    })
  }
  
  render() {
    const filteredFoodArray = this.filterFood(this.state.foodList, this.state.query);

    return (
      <div className="App text-center">
        <h1 className="title is-1">IronNutrition</h1>

        <button className="button is-info margin-bottom" onClick={this.showAddFoodForm}>Add a new food item to the list</button>
        {this.state.addFoodForm && < AddFoodInput onAddFood={this.addFood} />}
        {this.state.addFoodForm && ''}

        <input 
          className="input margin-bottom"
          type="text"
          value={this.state.query}
          placeholder="Type in the food you're searching for..."
          onChange={this.handleSearchBarInput}
        />

        {filteredFoodArray.map((food, index) => {
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
