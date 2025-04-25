// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import './donation.css';

const DonationCard = ({ onClose }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedTime, setSelectedTime] = useState('Morning');
  const [locationType, setLocationType] = useState('Home');
  const [quantityRange, setQuantityRange] = useState('6-10');
  const [totalItems, setTotalItems] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [isTotalItemsEmpty, setIsTotalItemsEmpty] = useState(false);
  const [isTotalItemsEmpty1, setIsTotalItemsEmpty1] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false); // NEW
  const [groceryItem, setGroceryItem] = useState('');
  const [groceryQuantity, setGroceryQuantity] = useState('');
  const [expiryConfirmed, setExpiryConfirmed] = useState(false);

  const [groceryNotes, setGroceryNotes] = useState('');

  const [selectedGender, setSelectedGender] = useState('');


  const [clothingNotes, setClothingNotes] = useState('');


  const [sizes, setSizes] = useState([]);


  // Handle Next button logic
  const handleNext2 = () => {
    setIsTotalItemsEmpty(false);
    setShowUserDetails(true);
    // Logic for handling the next step, e.g., validation
    // You can add validation to check if all required fields are filled.
  };




  // User details form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    checkFormValidity();
  }, [selectedTime, quantityRange, totalItems]);

  const checkTimeValidity = () => {
    const now = new Date();
    const currentHour = now.getHours();

    if (selectedTime === 'Morning') return currentHour >= 7 && currentHour <= 9;
    if (selectedTime === 'Afternoon') return currentHour >= 12 && currentHour <= 14;
    if (selectedTime === 'Night') return currentHour >= 19 && currentHour <= 21;

    return false;
  };

  const checkFormValidity = () => {
    const timeValid = checkTimeValidity();
    const quantityValid = quantityRange !== '1-5';
    setIsButtonDisabled(!(timeValid && quantityValid));
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category === activeCategory ? null : category);
  };

  const handleNext = () => {
    if (!totalItems) {
      setIsTotalItemsEmpty(true);
      return;
    }
    setIsTotalItemsEmpty(false);
    setShowUserDetails(true);
  };
  const handleNext1 = () => {
    if (!groceryItem) {
      setIsTotalItemsEmpty1(true);
      return;
    }
    setIsTotalItemsEmpty1(false);
    setShowUserDetails(true);
  };

  const handleBack = () => {
    setShowUserDetails(false);
  };

  const getTimeNote = () => {
    if (selectedTime === 'Morning') return 'Donate your food before 7AM to 10AM';
    if (selectedTime === 'Afternoon') return 'Donate your food before 12PM to 3PM';
    if (selectedTime === 'Night') return 'Donate your food before 7PM to 10PM';
    return '';
  };

  const handleFinalSubmit = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = true;
    if (!lastName.trim()) newErrors.lastName = true;
    if (!address.trim()) newErrors.address = true;
    if (!city.trim()) newErrors.city = true;
    if (!state.trim()) newErrors.state = true;
    if (!phone.trim()) newErrors.phone = true;
    if (!description.trim()) newErrors.description = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setShowThankYou(true); // Show thank you text
      setTimeout(() => {
        setShowThankYou(false);
        onClose(); // Close the card after 2 seconds
      }, 7000);
    }
  };




  const [ageDifference, setAgeDifference] = useState([]); // Array to store selected age differences

  const handleAgeDifferenceChange = (e) => {
    const value = e.target.value;
    setAgeDifference((prevState) =>
      prevState.includes(value)
        ? prevState.filter((item) => item !== value) // Remove if already selected
        : [...prevState, value] // Add if not selected
    );
  };


  const handleSizeChange = (e) => {
    const value = e.target.value;
    setSizes(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };



  return (
    <div className="donation-card">
      {showThankYou ? (
        <div className="thank-you-message">
          <h2>Thank You For Donating ❤️</h2>
        </div>
      ) : !showUserDetails ? (
        <>
          <button className="close-btn" onClick={onClose}>✖</button>
          <h2>Support Our Cause</h2>
          <p>Your donations help us serve better.</p>

          <div className="donation-buttons">
            {['Food', 'Groceries', 'Clothes'].map((item) => (
              <button
                key={item}
                className={`donate-button ${activeCategory === item ? 'active' : ''}`}
                onClick={() => handleCategoryClick(item)}
              >
                {item}
              </button>
            ))}
          </div>

          {activeCategory === 'Food' && (
            <div className="food-form">
              <div className="time-options">
                {['Morning', 'Afternoon', 'Night'].map((time) => (
                  <label key={time}>
                    <input
                      type="radio"
                      value={time}
                      checked={selectedTime === time}
                      onChange={(e) => setSelectedTime(e.target.value)}
                    />
                    {time}
                  </label>
                ))}
              </div>

              <select
                value={locationType}
                onChange={(e) => {
                  setLocationType(e.target.value);
                  if (e.target.value === 'Home') {
                    setQuantityRange('6-10');
                  } else {
                    setQuantityRange('11-15');
                  }
                }}
              >
                <option value="Home">Home</option>
                <option value="Hostel/PG">Hostel/PG</option>
                <option value="Hotels/Restaurants">Hotels/Restaurants</option>
              </select>

              <select value={quantityRange} onChange={(e) => setQuantityRange(e.target.value)}>
                <option value="6-10">6-10</option>
                <option value="11-15">11-15</option>
                <option value="16-20">16-20</option>
                <option value="20+">20+</option>
              </select>
              <p className="note-text"><b>Note:</b> Please select the estimated number of people the food can serve.</p>

              <input
                type="number"
                placeholder="Total number of items"
                value={totalItems}
                onChange={(e) => setTotalItems(e.target.value)}
                className={isTotalItemsEmpty ? 'highlight-red' : ''}
              />

              <p className="donation-note">{getTimeNote()}</p>

              <button
                className="submit-button"
                disabled={isButtonDisabled}
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          )}
          {activeCategory === 'Groceries' && (
            <div className="food-form">
              <div className="grocery-fields">
                <label>
                  Grocery Item Name:
                  <input
                    type="text"
                    value={groceryItem}
                    onChange={(e) => setGroceryItem(e.target.value)}
                    placeholder="e.g. Rice, Wheat, Sugar"
                    className={isTotalItemsEmpty1 ? 'highlight-red' : ''}
                  />
                </label>

                <label>
                  Quantity (in Kg):
                  <input
                    type="text"
                    value={groceryQuantity}
                    onChange={(e) => setGroceryQuantity(e.target.value)}
                    placeholder="e.g. 5,6,7"
                  />
                </label>

                <div className="expiry-checkbox">
                  <input
                    type="checkbox"
                    id="expiryConfirmed"
                    checked={expiryConfirmed}
                    onChange={(e) => setExpiryConfirmed(e.target.checked)}
                    
                  />
                  <label htmlFor="expiryConfirmed" style={{ marginLeft: '8px' }}>
                    I hereby confirm that I have checked the expiry date of the product.
                  </label>

                </div>

                <label>
                  Additional Notes (optional):
                  <textarea
                    value={groceryNotes}
                    onChange={(e) => setGroceryNotes(e.target.value)}
                    placeholder="e.g. Packed items only"
                  />
                </label>

                <button
                  className="submit-button"

                  onClick={handleNext1}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {activeCategory === 'Clothes' && (
            <div className="food-form">
              <div className="clothes-fields">
                {/* Radio buttons for Male, Female, Both */}
                <div className="gender-radio-group">
                  <label className="gender-label">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={selectedGender === 'Male'}
                      onChange={(e) => setSelectedGender(e.target.value)}
                    />
                    Male
                  </label>
                  <label className="gender-label">
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={selectedGender === 'Female'}
                      onChange={(e) => setSelectedGender(e.target.value)}
                    />
                    Female
                  </label>
                  <label className="gender-label">
                    <input
                      type="radio"
                      name="gender"
                      value="Both"
                      checked={selectedGender === 'Both'}
                      onChange={(e) => setSelectedGender(e.target.value)}
                    />
                    Both
                  </label>
                </div>

                {/* Age Difference (Multiple Selection with Checkboxes) */}
                <label>
                  Age Difference:
                  <div className="age-difference-checkboxes">
                    <label>
                      <input
                        type="checkbox"
                        value="0-10"
                        checked={ageDifference.includes("0-10")}
                        onChange={handleAgeDifferenceChange}
                      />
                      0-10 years
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="10-20"
                        checked={ageDifference.includes("10-20")}
                        onChange={handleAgeDifferenceChange}
                      />
                      10-20 years
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="20-30"
                        checked={ageDifference.includes("20-30")}
                        onChange={handleAgeDifferenceChange}
                      />
                      20-30 years
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="30+"
                        checked={ageDifference.includes("30+")}
                        onChange={handleAgeDifferenceChange}
                      />
                      30+ years
                    </label>
                  </div>
                </label>




                {/* Size */}
                <div style={{ marginTop: "-8px" }}>
                  <label>
                    Size:
                    <div className="checkbox-grid">
                      <label>
                        <input
                          type="checkbox"
                          value="S"
                          checked={sizes.includes("S")}
                          onChange={handleSizeChange}
                        />
                        S
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          value="M"
                          checked={sizes.includes("M")}
                          onChange={handleSizeChange}
                        />
                        M
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          value="L"
                          checked={sizes.includes("L")}
                          onChange={handleSizeChange}
                        />
                        L
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          value="XL"
                          checked={sizes.includes("XL")}
                          onChange={handleSizeChange}
                        />
                        XL
                      </label>
                    </div>
                  </label>
                </div>

                {/* Additional Notes */}
                <div style={{ marginTop: "-8px" }}>
                  <label>
                    Additional Notes (optional):
                    <textarea
                      value={clothingNotes}
                      onChange={(e) => setClothingNotes(e.target.value)}
                      placeholder="e.g. Clean and folded"
                    />
                  </label>

                  <button
                    className="submit-button"

                    onClick={handleNext2}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}



        </>
      ) : (
        <div className="user-details-form">
          <button className="back-btn" onClick={handleBack}>← Back</button>
          <h3>Enter Your Details</h3>

          <div className="input-group">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={errors.firstName ? 'highlight-red' : ''}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={errors.lastName ? 'highlight-red' : ''}
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={errors.address ? 'highlight-red' : ''}
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={errors.city ? 'highlight-red' : ''}
            />
            <input
              type="text"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className={errors.state ? 'highlight-red' : ''}
            />
          </div>

          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={errors.phone ? 'highlight-red' : ''}
          />

          <textarea
            placeholder="Description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={errors.description ? 'highlight-red' : ''}
          ></textarea>

          <button className="submit-button" onClick={handleFinalSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default DonationCard;
