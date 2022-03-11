import React from 'react';
import { useAppContext } from '../Context/context';

const Checkout = () => {
  const { currentUser } = useAppContext();
  console.log(currentUser);
  return (
    <section className='section'>
      <p>{currentUser?.email}</p>
    </section>
  );
};

export default Checkout;
