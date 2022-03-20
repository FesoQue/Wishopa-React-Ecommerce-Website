import React from 'react';
import OFFER_1 from '../images/worldwide.svg';
import OFFER_2 from '../images/pay.svg';
import OFFER_3 from '../images/return.svg';
import OFFER_4 from '../images/24hr.svg';
import './App.css';

const Offer = () => {
  return (
    <section>
      <div className='content offer-content container'>
        <div className='title'>
          <h2>We Offer</h2>
        </div>
        <div className='offers'>
          {/* 1 */}
          <div className='offer-card'>
            <div className='offer-img-content'>
              <img src={OFFER_1} alt='worldwide' className='icon' />
            </div>
            <div className='offer-text-content'>
              <h4>Free Delivery</h4>
              <p>for all orders over $99.0</p>
            </div>
          </div>
          {/* 2 */}
          <div className='offer-card'>
            <div className='offer-img-content'>
              <img src={OFFER_2} alt='worldwide' className='icon' />
            </div>
            <div className='offer-text-content'>
              <h4>Secure Payment</h4>
              <p>Guarantee secured payment</p>
            </div>
          </div>
          {/* 3 */}
          <div className='offer-card'>
            <div className='offer-img-content'>
              <img src={OFFER_3} alt='worldwide' className='icon' />
            </div>
            <div className='offer-text-content'>
              <h4>30 Days return</h4>
              <p>when not satisfied with orders</p>
            </div>
          </div>
          {/* 4 */}
          <div className='offer-card'>
            <div className='offer-img-content'>
              <img src={OFFER_4} alt='worldwide' className='icon' />
            </div>
            <div className='offer-text-content'>
              <h4>24/7 Support</h4>
              <p>Dedicated customer support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offer;
