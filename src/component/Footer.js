import React from 'react';
import { Link } from 'react-router-dom';
import FACEBOOK from '../images/icon-facebook.svg';
import TWITTER from '../images/icon-twitter.svg';
import INSTAGRAM from '../images/icon-instagram.svg';
import PINTEREST from '../images/icon-pinterest.svg';

const Footer = () => {
  return (
    <section className='footer-section'>
      <div className='footer-content container'>
        <div className='footer-col-1'>
          <h1 className='logo'>
            <Link to='/'>Wishopa</Link>
          </h1>
          <div>
            <img src={FACEBOOK} alt='facebook' />
            <img src={TWITTER} alt='twitter' />
            <img src={INSTAGRAM} alt='instagram' />
            <img src={PINTEREST} alt='pinterest' />
          </div>
        </div>
        <div className='footer-col-2'>
          <h4>CATEGORIES</h4>
          <ul>
            <li>
              <Link to="/men's clothing">Men's Clothing</Link>
            </li>
            <li>
              <Link to="/women's clothing">women's Clothing</Link>
            </li>
            <li>
              <Link to='/electronics'>Gadgets</Link>
            </li>
            <li>
              <Link to='/jewelery'>Jewelry</Link>
            </li>
          </ul>
        </div>
        <div className='footer-col-3'>
          <h4>GET IN TOUCH</h4>
          <div>
            <p className='phone-no'>+234-90-5676-32</p>
            <p className='mail'>wishopa@gmail.com</p>
            <p className='address'>123, Anon Str, Naija, Africa.</p>
          </div>
        </div>
      </div>
      <div className='attr'>
        <p>
          © <span>{new Date().getFullYear()}</span> Wishopa. All Rights Reserved
        </p>
      </div>
    </section>
  );
};

export default Footer;
