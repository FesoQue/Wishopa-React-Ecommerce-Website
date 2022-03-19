import React, { useEffect } from 'react';
import Hero from '../component/Hero';
import Categories from '../component/Categories';
import Featured from '../component/Featured';
import Offer from '../component/Offer';
import Review from '../component/Review';
import Newsletter from '../component/Newsletter';
import Success from '../component/Success';
import { useAppContext } from '../Context/context';

const Homepage = () => {
  const { docTitle, setDocTitle } = useAppContext();

  useEffect(() => {
    setDocTitle('Wishopa - Home');
  }, [docTitle]);
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
