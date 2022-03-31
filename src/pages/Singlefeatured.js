import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { AiFillStar } from 'react-icons/ai';
import { Link, useParams } from 'react-router-dom';
import { featuredData } from '../data';
import { useAppContext } from '../Context/context';

const Singlefeatured = () => {
  const [error, setError] = useState();
  const [isNtwrkErr, setIsNtwrkErr] = useState();

  const { id } = useParams();

  const [product, setProduct] = useState();

  const { featuredProducts } = featuredData;

  // context
  const { AddToCart, uniqueItem, setDocTitle } = useAppContext();

  // fn
  const handleAddToCart = () => {
    AddToCart(productID);
    toast.success('Added to cart!');
    if (error) {
      setIsNtwrkErr(true);
    } else {
      setIsNtwrkErr(false);
    }
    console.log(isNtwrkErr);
  };

  // item properties
  const productID = product?.id;
  const title = product?.title;
  const image = product?.image;
  const desc = product?.description;
  const category = product?.category;
  const price = product?.price;
  const rating = product?.rating;
  const feature = product?.features;

  useEffect(() => {
    featuredProducts.filter((item) => {
      if (item.id === Number(id)) {
        setProduct(item);
      }
    });
    setDocTitle(title);
  }, [id]);

  useEffect(() => {
    setDocTitle(title);
  }, [productID]);

  // if item exist in cart change button text to added to cart.
  const isInCart = uniqueItem.some((item) => item.title === title);

  return (
    <section className='section single-page-section'>
      <div className='url-slug container'>
        <span>
          <Link to='/'>/ home </Link>
        </span>
        <span>/ featured</span>
      </div>
      {/* product */}
      {product ? (
        <div className='single-item container'>
          <div className='single-item-content'>
            <div className='single-item-card'>
              {/* product image */}
              <div className='single-item-img-wrap single-featured-item-img'>
                <img loading='lazy' src={image} alt={title} />
              </div>
              {/* info */}
              <div className='single-item-info'>
                {/* title */}
                <p className='single-item-category'>{category}</p>
                <h1>{title}</h1>
                <p className='single-item-author'>
                  By <Link to='/'>wishopa</Link>
                </p>
                {/* rating */}
                <p className='single-item-rating'>
                  Rating :
                  <span style={{ color: 'gold' }}>
                    <AiFillStar />
                  </span>
                  | <span style={{ color: '#5b5fdf' }}> {rating}</span>
                </p>
                {/* description */}
                <p className='single-item-desc'>{desc}</p>
                {/* features */}
                <div className='item-features'>
                  <p>
                    <strong>Features:</strong>
                  </p>
                  <ul>
                    {feature.map((item) => {
                      return <li key={item}>- {item}</li>;
                    })}
                  </ul>
                </div>
                {/* price */}
                <div className='single-item-price'>
                  <p className='discount'>
                    <span className='discount-price'>
                      ${(price * 0.75).toFixed(2)}
                    </span>
                    <span className='discount-percent'>35%</span>
                  </p>
                  <p className='old-price'>${price}</p>
                </div>
                {/* add to cart */}
                <div className='item-qty-wrapper'>
                  <div className='add-to-cart'>
                    <button
                      disabled={isInCart}
                      className='addtocart-btn'
                      onClick={handleAddToCart}
                    >
                      {isInCart ? 'Added to cart' : 'Add to cart'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <Toaster />
    </section>
  );
};

export default Singlefeatured;
