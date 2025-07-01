// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [alertMsg, setAlertMsg] = useState('');
  const [alertType, setAlertType] = useState('');
  const [isLoading, setIsLoading] = useState(false); // ⬅️ new loading state

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const showAlert = (message, type = 'error') => {
    setAlertMsg(message);
    setAlertType(type);
    setTimeout(() => {
      setAlertMsg('');
      setAlertType('');
    }, 4000);
  };

  const onLogin = async (event) => {
    event.preventDefault();

    if (isLoading) return; // prevent multiple submissions
    setIsLoading(true);

    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
        showAlert("Login successful!", "success");
      } else {
        showAlert(response.data.message, "error");
      }
    } catch (error) {
      showAlert("Something went wrong. Please try again.", "error");
    } finally {
      setIsLoading(false); // re-enable button
    }
  };

  return (
    <div className='login-popup'>
      {/* Alert Message Box */}
      {alertMsg && (
        <div className={`custom-alert ${alertType}`}>
          {alertMsg}
        </div>
      )}

      <form onSubmit={onLogin} className="login-popup-continer">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="close" />
        </div>

        <div className="login-popup-inputs">
          {currState === "Login" ? null : (
            <input
              name='name'
              onChange={onChangeHandler}
              value={data.name}
              type='text'
              placeholder='Your Name'
              required
            />
          )}
          <input
            name='email'
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder='Your Email'
            required
          />
          <input
            name='password'
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder='Password'
            required
          />
        </div>

        <button type='submit' disabled={isLoading}>
          {isLoading ? "Please wait..." : (currState === "Sign Up" ? "Create account" : "Login")}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        {currState === "Login" ? (
          <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
        ) : (
          <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
