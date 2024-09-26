// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import { toast } from 'react-toastify'; // Import toast

// eslint-disable-next-line react/prop-types
const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  // Check if cartItems and cartItems[id] are defined
  const itemInCart = cartItems && cartItems[id];

  const handleAddToCart = () => {
    addToCart(id);
    toast.success('Item Added to Cart!', { autoClose: 1300 }); // 2 seconds toast
  };

  const handleRemoveFromCart = () => {
    removeFromCart(id);
    toast.info('Item Removed from Cart!', { autoClose: 1000 }); // 2 seconds toast for removal
  };

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className='food-item-image' src={url + "/images/" + image} alt="" />
        {
          !itemInCart ? (
            <img className='add' onClick={handleAddToCart} src={assets.add_icon_white} alt="Add to cart" />
          ) : (
            <div className='food-item-counter'>
              <img onClick={handleRemoveFromCart} src={assets.remove_icon_red} alt="Remove from cart" />
              <p>{cartItems[id]}</p>
              <img onClick={handleAddToCart} src={assets.add_icon_green} alt="Add more" />
            </div>
          )
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">₹{price}</p>
      </div>
    </div>
  );
}

export default FoodItem;
