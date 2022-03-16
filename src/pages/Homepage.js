import React from 'react';
import Hero from '../component/Hero';
import Categories from '../component/Categories';
import Featured from '../component/Featured';
import Offer from '../component/Offer';
import Review from '../component/Review';
import Newsletter from '../component/Newsletter';
import Success from '../component/Success';

const Homepage = () => {
  return (
    <main>
      <Hero />
      <Categories />
      <Featured />
      <Offer />
      <Review />
      <Newsletter />
      <Success />
    </main>
  );
};

export default Homepage;
