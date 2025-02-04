import React from 'react';
import { Component } from 'react';
import './App.css';
import 'bulma/css/bulma.css';
import FoodBox from './components/FoodBox';
import foods from './foods.json';
import AddFoodInput from './components/AddFoodInput';
import TodaysFoodList from './components/TodaysFoodList';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodList: foods,
      addFoodForm: false,
      query: '',
      todaysFood: [],
    };
  }

  addFood = (newFood) => {
    const initialFoodList = [...this.state.foodList];
    const { name, calories, image } = newFood;

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

  onAddTodaysFood = (foodObj) => {
    const todaysFoodCopy = [...this.state.todaysFood];

    const index = todaysFoodCopy.findIndex(food => food.name === foodObj.name);
    console.log(foodObj)

    if (index === -1) {
      todaysFoodCopy.push(foodObj);
    } else if (index > -1) {
      todaysFoodCopy[index].caloriesTotal += foodObj.caloriesTotal;
      todaysFoodCopy[index].quantity += foodObj.quantity;
    }

    this.setState({
      todaysFood: todaysFoodCopy,
    })
  }


  onDeleteItem = (item) => {
    const initialTodaysFoodList = [...this.state.todaysFood]

    const updatedTodaysFood = initialTodaysFoodList.filter(food => food !== item)

    this.setState({
      todaysFood: updatedTodaysFood,
    })
  }
  
  render() {
    const filteredFoodArray = this.filterFood(this.state.foodList, this.state.query);

    const sumTotalCalories = this.state.todaysFood.reduce((acc, curr) => {
      return acc + curr.caloriesTotal
    }, 0);

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

        <div className="container__food">
        <div className="container__foodBox"> 
            {filteredFoodArray.map((food, index) => {
              return(
                < FoodBox 
                    key={index}
                    food={food}
                    id={index}
                    addTodaysFood={this.onAddTodaysFood}
                />
              )
            })
            }
          </div>
          <div className="container__todaysFood text-left">
              <h2 className="title is-4">Today's Food</h2>
                <ul className="container__todaysFood__ul">
                  {this.state.todaysFood.map((food, index) => {
                    return(
                      < TodaysFoodList 
                        key={index}
                        food={food}
                        onDelete={this.onDeleteItem}
                      />
                    )
                  })}
                </ul>
                <p>Total: {sumTotalCalories} cal</p>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
