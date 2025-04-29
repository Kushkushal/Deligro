import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './donation.css';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets'; // Optional if you want icons

const Donations = ({ url }) => {
  const [selectedTab, setSelectedTab] = useState('Food');
  const [donations, setDonations] = useState([]);

  const fetchDonations = async () => {
    try {
      const response = await axios.get(`${url}/api/donation/list`);
      if (response.data.success) {
        setDonations(response.data.data);
      } else {
        toast.error("Failed to fetch donations");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  return (
    <div className="donation add">
      <h3  style={{marginBottom:"13px"}}>Donation Page</h3>

      <div className="donation-tabs">
        {['Food', 'Groceries', 'Clothes'].map(tab => (
          <button
            key={tab}
            className={`tab-button ${selectedTab === tab ? 'active' : ''}`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="donation-list">
        {donations.filter(d => d.donationType === selectedTab).length === 0 ? (
          <p>No {selectedTab.toLowerCase()} donations found.</p>
        ) : (
          donations
            .filter(d => d.donationType === selectedTab)
            .map((donation, index) => (
              <div key={index} className="donation-item">
              <img src={assets.parcel_icon} alt="" />
            
              <div>
                <p className="donation-type"><strong>{donation.donationType}</strong> Donation</p>
            
                {selectedTab === 'Food' && (
                  <>
                    <p><strong>Time:</strong> {donation.formData?.selectedTime}</p>
                    <p><strong>Location Type:</strong> {donation.formData?.locationType}</p>
                    <p><strong>Quantity:</strong> {donation.formData?.quantityRange}</p>
                    <p><strong>Total Items:</strong> {donation.formData?.totalItems}</p>
                  </>
                )}
            
                {selectedTab === 'Groceries' && (
                  <>
                    <p><strong>Items:</strong> {donation.formData?.groceryItem}</p>
                    <p><strong>Quantities:</strong> {donation.formData?.groceryQuantity?.join(', ')}</p>
                    <p><strong>Expiry Confirmed:</strong> {donation.formData?.expiryConfirmed ? "Yes" : "No"}</p>
                    <p><strong>Notes:</strong> {donation.formData?.groceryNotes}</p>
                  </>
                )}
            
                {selectedTab === 'Clothes' && (
                  <>
                    <p><strong>Gender:</strong> {donation.formData?.gender}</p>
                    <p><strong>Age Groups:</strong> {donation.formData?.ageDifference?.join(', ')}</p>
                    <p><strong>Sizes:</strong> {donation.formData?.sizes?.join(', ')}</p>
                    <p><strong>Notes:</strong> {donation.formData?.clothingNotes}</p>
                  </>
                )}
            
                {/* Move Name, Address, Phone to the bottom */}
                <div className="donation-user-info">
                  <p className="donor-name">{donation.userDetails?.firstName} {donation.userDetails?.lastName}</p>
                  <div className="donation-address">
                    <p>{donation.userDetails?.address}</p>
                    <p>{donation.userDetails?.phone}</p>
                  </div>
                </div>
              </div>
            </div>
            
            ))
        )}
      </div>
    </div>
  );
};

export default Donations;
