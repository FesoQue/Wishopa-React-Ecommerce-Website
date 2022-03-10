import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import REVIEW_IMG1 from '../images/customer-1.jpg';
import REVIEW_IMG2 from '../images/customer-2.jpg';
import REVIEW_IMG3 from '../images/customer-3.jpg';
import './App.css';

const Review = () => {
  const items = [
    <div className='review-card'>
      <div className='review-img-content'>
        <div className='review-img-wrap'>
          <img src={REVIEW_IMG3} alt='reviewer' />
          <p>Heather Benett</p>
          <span>customer</span>
        </div>
      </div>
      <div className='review-text-content'>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio minus
          hic, ipsa nam aliquid qui fugiat saepe debitis libero
        </p>
      </div>
    </div>,
    <div className='review-card'>
      <div className='review-img-content'>
        <div className='review-img-wrap'>
          <img src={REVIEW_IMG2} alt='reviewer' />
          <p>Bruce McFish</p>
          <span>customer</span>
        </div>
      </div>
      <div className='review-text-content'>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio minus
          hic, ipsa nam aliquid qui fugiat saepe debitis libero
        </p>
      </div>
    </div>,
    <div className='review-card'>
      <div className='review-img-content'>
        <div className='review-img-wrap'>
          <img src={REVIEW_IMG1} alt='reviewer' />
          <p>Angus Daveson</p>
          <span>customer</span>
        </div>
      </div>
      <div className='review-text-content'>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio minus
          hic, ipsa nam aliquid qui fugiat saepe debitis libero
        </p>
      </div>
    </div>,
  ];

  const responsive = {
    0: {
      item: 1,
    },
    1000: {
      item: 1,
    },
  };

  return (
    <section>
      <div className='content review-content container'>
        <div className='title'>
          <h2>Reviews</h2>
        </div>
        <p className='subtext'>See what customers are saying</p>
        <div className='reviews'>
          <AliceCarousel
            items={items}
            responsive={responsive}
            autoPlay
            infinite
            mouseTracking
            disableButtonsControls
            animationDuration={1000}
            autoPlayInterval={4000}
          />
        </div>
      </div>
    </section>
  );
};

export default Review;
