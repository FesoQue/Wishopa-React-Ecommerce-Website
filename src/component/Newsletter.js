import React from 'react';
import { BsEnvelope } from 'react-icons/bs';
import GIF from '../images/animation.gif';
const Newsletter = () => {
  return (
    <section>
      <div className='newsletter-content container content'>
        <div className='newsletter'>
          <div className='newsletter-heading'>
            <h4>Subscribe To Newsletter</h4>
            <p>And get $20 coupon for free shopping</p>
          </div>
          <form
            action='https://formspree.io/f/xayabjwa'
            method='POST'
            id='newsletter_form'
          >
            <div className='form-control'>
              <span>
                <BsEnvelope />
              </span>
              <input
                type='email'
                name='newsletter_email'
                placeholder='your@email.com'
                required
              />
            </div>
            <input
              type='hidden'
              name='_subject'
              value='New newsletter subscriber in!!!!'
            />
            <button
              className='newsletter-btn'
              aria-label='subscribe'
              type='submit'
            >
              Subscribe
            </button>
          </form>
        </div>
        {/* animation */}

        <img src={GIF} alt='gif' className='gif-sm gif' loading='lazy' />
        <img src={GIF} alt='gif' className='gif-xl gif' loading='lazy' />
      </div>
    </section>
  );
};

export default Newsletter;
