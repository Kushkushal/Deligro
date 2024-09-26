// eslint-disable-next-line no-unused-vars
import React from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';

// eslint-disable-next-line react/prop-types
const ExploreMenu = ({ category, setCategory }) => {

  const handleScroll = () => {
    const targetSection = document.getElementById('food-display'); // Targeting the #food-display section
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth', // Smooth scrolling
        block: 'start' // Aligns the target element to the top of the screen
      });
    }
  };

  return (
    <div className='explore-menu' id='explore-menu'>
      {/* Add the title "Hotels Near You" */}
      <h2 className="explore-menu-title">Hotels Near You</h2> 

      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div 
              onClick={() => {
                setCategory(prev => prev === item.menu_name ? "All" : item.menu_name);
                handleScroll(); // Scroll to the #food-display section
              }} 
              key={index} 
              className='explore-menu-list-item card' // Added 'card' class
            >
              <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt={item.menu_name} />
              <p>{item.menu_name}</p>
              <b className="menu-timings">{item.timings}</b> {/* Display timings here */}
            </div>
          )
        })}
      </div>
      <hr />
    </div>
  );
}

export default ExploreMenu;
