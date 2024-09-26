// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

// eslint-disable-next-line react/prop-types
const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  // Show loading message if food_list is empty or undefined
  if (!food_list || food_list.length === 0) {
    return (
      <div className='food-display'>
        <center><h3>Items loading, please wait...</h3></center>
      </div>
    );
  }

  return (
    <div className='food-display' id='food-display'>
      <center><h3>Explore Menu</h3></center>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <div key={index} id={item.category}> {/* Set the id to category */}
                <FoodItem
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              </div>
            );
          }
          return null; // Add return null to avoid React warning
        })}
      </div>
    </div>
  );
}

export default FoodDisplay;
