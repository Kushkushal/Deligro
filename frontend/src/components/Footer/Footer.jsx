// eslint-disable-next-line no-unused-vars
import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img className="logo" src={assets.logo} alt="logo" />
                    <p>Deligro – Fresh groceries and meals delivered to your doorstep, hassle-free!</p>
                    
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="" />
                        <a href="https://www.instagram.com/deligro.insta" target="_blank" rel="noopener noreferrer">
  <img src={assets.insta} alt="Instagram" />
</a>
<a href="https://whatsapp.com/channel/0029VaoSlhhEFeXbnKi8Fi2h" target="_blank" rel="noopener noreferrer">
  <img src={assets.whatsapp} alt="WhatsApp" />
</a>

                    </div>

                </div>
                <div className="footer-content-center">
<h2>COMPANY</h2>
<ul>
    <li>Home</li>
    <li>About Us</li>
    <li>Delivery</li>
    <li>Privacy Policy</li>
</ul>
                </div>
                <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
<ul>
    <li><a href="tel:+918123090954">+91 8123090954</a></li>
    <li><a href="tel:+916362050541">+91 6362050541</a></li>
    <li><a href="mailto:deligro.service@gmail.com">deligro.service@gmail.com</a></li>
</ul>

                </div>

            </div>
<hr />
<p className="footer-copyright">Copyright 2024 @ Deligro.com - All Right Reserved.</p>
        </div>
    )
}

export default Footer
