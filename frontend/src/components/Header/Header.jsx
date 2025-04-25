// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import './Header.css'
import DonationCard from '../Donation/donation';
const Header = () => {
  const [donations,setdonations] = useState(false);

  return (
    <>
   { donations && <DonationCard onClose={() => setdonations(false)} />}
    
    
    <div className='header'>
        <div className="header-contents">
            <h2>Donate Now</h2>
            
           <a href='#' ><button onClick={()=>{
            setdonations(true)
           }}>Donate</button></a>
        </div>
      
    </div>
    </>
  )
}

export default Header
