import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const Success = () => {
  return (
    <div className='success-modal'>
      <div className='container success-content'>
        <span>
          <FaCheckCircle />
        </span>
        <h2>Thanks for your order!</h2>
        <p>
          Wohoo! Your payment was successful, and your order is complete. A
          receipt and download instructions are on the way to your inbox
        </p>
        <button className='ok-btn'>OK</button>
      </div>
    </div>
  );
};

export default Success;
