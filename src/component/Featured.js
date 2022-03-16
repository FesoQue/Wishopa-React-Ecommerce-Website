import React from 'react';
import { featuredData } from '../data';

const Featured = () => {
  const { featuredProducts } = featuredData;
  console.log(featuredProducts);
  return (
    <section>
      <div className='content featured-content container'>
        <div className='title'>
          <h2>Featured Products</h2>
        </div>
        <p className='subtext'>Shop items by category</p>
        <div className='featured-products'>
          <div className='featured-product-cards'>
            {featuredProducts.map((products) => {
              const id = products.id;
              const img = products.image;
              const title = products.title;
              const price = products.price;
              return (
                <article key={id} className='featured-card'>
                  <img loading='lazy' src={img} alt={title} />
                  <div>
                    <p>{title}</p>
                    <p>${price}</p>
                    <button className='addtocart-btn'>Add To Cart</button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
