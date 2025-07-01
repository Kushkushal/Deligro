// eslint-disable-next-line no-unused-vars
import React from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';
import { toast } from 'react-toastify';

const ExploreMenu = ({ category, setCategory }) => {

  const toMinutes = timeStr => {
    const [time, modifier] = timeStr.trim().split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const finalList = menu_list.map(item => {
    const [start, end] = item.timings.split(" - ");
    const startMin = toMinutes(start);
    const endMin = toMinutes(end);
    const isOpen = currentMinutes >= startMin && currentMinutes <= endMin;
    return { ...item, isOpen };
  });

  const handleScroll = () => {
    const targetSection = document.getElementById('food-display');
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className='explore-menu' id='explore-menu'>
      <div className="explore-menu-header">
        <h2 className="explore-menu-title">Hotels Near You</h2>
      </div>

      <div className="explore-menu-list">
        {finalList.length > 0 ? (
          finalList.map((item, index) => (
            <div
              onClick={() => {
                if (item.isOpen) {
                  setCategory(prev => prev === item.menu_name ? "All" : item.menu_name);
                  handleScroll();
                } else {
                  toast.warn(`${item.menu_name} is not yet opened.`, { autoClose: 1300 });
                }
              }}
              key={index}
              className="explore-menu-list-item card"
              style={{ cursor: 'pointer' }}
            >
              <img
                className={category === item.menu_name ? "active" : ""}
                src={item.menu_image}
                alt={item.menu_name}
              />
              <p>{item.menu_name}</p>
              <b className="menu-timings">{item.timings}</b>
            </div>
          ))
        ) : (
          <p style={{ padding: '20px', fontSize: '18px', textAlign: 'center' }}>No data available</p>
        )}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
