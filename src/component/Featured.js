import React from 'react';
import { useHistory } from 'react-router-dom';
import { featuredData } from '../data';

const Featured = () => {
  const history = useHistory();

  const { featuredProducts } = featuredData;

  const handleRoute = (id) => {
    history.push(`/featured/${id}`);
    window.scrollTo(0, 0);
  };

  return (
    <section>
      <div className='content featured-content container'>
        <div className='title'>
          <h2>Featured Products</h2>
        </div>
        <p className='subtext'>Shop high quality, low prices items</p>
        <div className='featured-products'>
          <div className='featured-product-cards'>
            {featuredProducts.map((products) => {
              const id = products.id;
              const img = products.image;
              const title = products.title;
              const price = products.price;
              return (
                <article
                  key={id}
                  className='featured-card'
                  onClick={() => handleRoute(id)}
                >
                  <img loading='lazy' src={img} alt={title} />
                  <div>
                    <p>{title}</p>
                    <p>${price}</p>
                    <button className='addtocart-btn'>Shop Item</button>
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
