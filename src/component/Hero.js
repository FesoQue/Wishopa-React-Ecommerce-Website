import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import HERO_IMG1 from '../images/heroimg1.png';
import HERO_IMG2 from '../images/heroimg2.png';
import HERO_IMG3 from '../images/heroimg3.png';
import HERO_IMG4 from '../images/heroimg4.png';
import { Link } from 'react-router-dom';
import './App.css';

const Hero = () => {
  const items = [
    <img src={HERO_IMG1} alt='bg' />,
    <img src={HERO_IMG2} alt='bg' />,
    <img src={HERO_IMG3} alt='bg' />,
    <img src={HERO_IMG4} alt='bg' />,
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
    <section className='hero'>
      <div className='content hero-content container'>
        <div className='hero-text-content'>
          <h1>
            Top Trending <br /> {new Date().getFullYear()}
            <span>Mega Deals!</span>
          </h1>
          <h2>
            Flat <span>35%</span> Off
          </h2>
          <p>Enjoy Best Prices Fashion sales</p>
          <Link to='/products' className='cta-btn'>
            Shop Products
          </Link>
        </div>
        <div className='hero-img-content carousel'>
          <AliceCarousel
            autoPlay
            items={items}
            infinite
            disableButtonsControls
            disableDotsControls
            animationDuration={1000}
            autoPlayInterval={3000}
            responsive={responsive}
            animationType='fadeout'
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
