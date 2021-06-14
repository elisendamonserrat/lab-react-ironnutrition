import React from 'react';
import './App.css';
import 'bulma/css/bulma.css';
import FoodBox from './components/FoodBox';
import foods from './foods.json';


function App() {
  return (
    <div className="App">
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

export default App;
