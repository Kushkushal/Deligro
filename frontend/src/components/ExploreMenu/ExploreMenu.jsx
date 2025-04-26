// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import './ExploreMenu.css';
import { menu_list, menu_list2 } from '../../assets/assets';
import { toast } from 'react-toastify';
import { FaMapMarkerAlt } from 'react-icons/fa';

const ExploreMenu = ({ category, setCategory }) => {
  const [selectedLocation, setSelectedLocation] = useState("You");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  const handleScroll = () => {
    const targetSection = document.getElementById('food-display');
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const a = menu_list2;
  const b = menu_list;

  const dataVars = {
    You:a,
    Koramangala: a,
    Madiwala: a,
    Silkboard: b,
    "HSR Layout": b,
    "BTM Layout": a,
    Bommanahalli: a,
    "Electronic City": a,
    Bommasandra: a,
    Chandhapurpa: a,
    Anekal: b
  };
  

  const matchedKeys = Object.keys(dataVars).filter(key =>
    selectedLocation.toLowerCase().includes(key.toLowerCase())
  );

  let finalList = matchedKeys.length > 0
    ? matchedKeys.flatMap(key => dataVars[key])
    : [];

  const toMinutes = timeStr => {
    const [time, modifier] = timeStr.trim().split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  finalList = finalList.map(item => {
    const [start, end] = item.timings.split(" - ");
    const startMin = toMinutes(start);
    const endMin = toMinutes(end);
    const isOpen = currentMinutes >= startMin && currentMinutes <= endMin;
    return { ...item, isOpen };
  });

  return (
    <div className='explore-menu' id='explore-menu'>
      <div className="explore-menu-header">
        <h2 className="explore-menu-title">
        Hotels Near {selectedLocation === "You" ? "You" : selectedLocation}
          <div className="location-wrapper">
            <FaMapMarkerAlt
              className="location-icon"
              onClick={() => {
                setShowDropdown(true);
                setShowTooltip(false);
              }}
            />
            {showTooltip && !showDropdown && (
              <div className="location-tooltip">
                Click here to select your location
                <div className="tooltip-arrow" />
              </div>
            )}
          </div>
        </h2>
        
      </div>

      {showDropdown && (
  <div className="modal-overlay" onClick={() => setShowDropdown(false)}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <h3>Select Your Location</h3>
      <div style={{ marginTop: '20px' }}>
        <select
          value={selectedLocation}
          onChange={e => {
            setSelectedLocation(e.target.value);
            setShowDropdown(false);
          }}
        >
            <option value="HSR Layout">Koramangala</option>
            <option value="HSR Layout">Madiwala</option>
            <option value="Silkboard">Silkboard</option>
          <option value="HSR Layout">HSR Layout</option>
          <option value="BTM Layout">BTM Layout</option>
          <option value="BTM Layout">Bommanahalli</option>
          <option value="BTM Layout">Electronic City</option>
          <option value="BTM Layout">Bommasandra</option>
          <option value="Chandhapurpa">Chandhapurpa</option>
          <option value="Silkboard">Anekal</option>
          
        </select>
      </div>
      {/* Note below select */}
      <p style={{ marginTop: '15px', fontSize: '14px', color: 'gray' }}>
       <b>Note:</b>  This service is available only in Bangalore.
      </p>
    </div>
  </div>
)}


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
