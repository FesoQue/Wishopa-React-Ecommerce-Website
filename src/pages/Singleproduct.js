import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSingleProductData } from '../QueryHooks/useFetchSingleProduct';
import { Link } from 'react-router-dom';
import LOADER from '../images/rippe-loading.gif';
import ERROR from '../images/error.gif';
import './Pages.css';
import { useAppContext } from '../Context/context';
import { AiFillStar } from 'react-icons/ai';
import toast, { Toaster } from 'react-hot-toast';

const Singleproduct = () => {
  const { id } = useParams();

  // useQuery fn
  const { isLoading, isError, data } = useSingleProductData(id);

  // context
  const { AddToCart, uniqueItem, setDocTitle } = useAppContext();

  // item properties
  const productInfo = data?.data;
  const productID = productInfo?.id;
  const title = productInfo?.title;
  const image = productInfo?.image;
  const desc = productInfo?.description;
  const category = productInfo?.category;
  const price = productInfo?.price;
  const rating = productInfo?.rating;
  const rate = rating?.rate;

  // fn
  const handleAddToCart = () => {
    AddToCart(productID);

    toast.success('Added to cart!');
  };

  useEffect(() => {
    setDocTitle(title);
  }, [productInfo]);

  // if item exist in cart change button text to added to cart.
  const isInCart = uniqueItem.some((item) => item.title === title);

  return (
    <section className='section single-page-section'>
      <div className='url-slug container'>
        <span>
          <Link to='/'>/ home </Link>
        </span>
        <span>
          <Link to='/products'>/ products </Link>
        </span>
      </div>
      {/* on loading */}
      <div className='onload container'>
        {isLoading ? (
          <div className='loading'>
            <img src={LOADER} alt='loading' />
          </div>
        ) : null}
        {isError ? (
          <div className='loading'>
            <img src={ERROR} alt='loading' />
          </div>
        ) : null}
      </div>
      {/* product */}
      {productInfo ? (
        <div className='single-item container'>
          <div className='single-item-content'>
            <div className='single-item-card'>
              {/* product image */}
              <div className='single-item-img-wrap'>
                <img src={image} alt={title} />
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
                  | <span style={{ color: '#5b5fdf' }}> {rate}</span>
                </p>
                {/* description */}
                <p className='single-item-desc'>{desc}</p>
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

export default Singleproduct;
