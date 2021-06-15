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
      calories: 0.
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

  onAddTodaysFood = ( { food }, quantity) => {
    const initialTodaysFoodList = [...this.state.todaysFood];

    initialTodaysFoodList.push({...food, quantity});

    const groupedFood = initialTodaysFoodList.reduce((acc, curr) => {

      const foodExists = acc.find(item => item.name === curr.name);

      if (foodExists) {
        foodExists.quantity = parseInt(foodExists.quantity) + parseInt(quantity);
        foodExists.calories = parseInt(foodExists.quantity) * parseInt(foodExists.calories);
        return acc;
      }
      return [...acc, curr]
    }, []);

    this.setState({
      todaysFood: groupedFood,
      calories: this.sumTotalCalories(groupedFood)
    })
  }

  sumTotalCalories = (foodList) => {
    return foodList.reduce((acc, currentValue) => {
      return acc + currentValue.calories
    }, 0);
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
                <p>Total: {this.state.calories} cal</p>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
