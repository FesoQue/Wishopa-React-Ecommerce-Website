import React, { useState, useEffect } from 'react';
import { useFetchAllProducts } from '../QueryHooks/useFetchAllProducts';
import BANNER from '../images/men-banner.png';
import BANNER2 from '../images/women-banner.png';
import BANNER3 from '../images/gadget-banner.png';
import BANNER4 from '../images/jewelery-banner.png';
import LOADER from '../images/rippe-loading.gif';
import ERROR from '../images/error.gif';
import Newsletter from '../component/Newsletter';
import Offer from '../component/Offer';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';
import './Pages.css';
import { FiSearch } from 'react-icons/fi';
import { useAppContext } from '../Context/context';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

const ProductPage = () => {
  const history = useHistory();
  const [searchTerms, setSearchTerms] = useState('');
  const [filterValue, setFilterValue] = useState('');
  // useQuery fn
  const { isLoading, isError, data, refetch } = useFetchAllProducts();
  // useContext
  const { handleSearch, setDocTitle } = useAppContext();
  const productData = data?.data;

  // sort --- ascending
  const ascendingOrder = (arr) => {
    return arr.sort((a, b) => {
      if (a.title === b.title) {
        return 0;
      }
      if (a.title > b.title) {
        return 1;
      }
      if (a.title < b.title) {
        return -1;
      }
    });
  };
  // sort --- descending
  const descendingOrder = (arr) => {
    return arr.sort((a, b) => {
      if (a.title === b.title) {
        return 0;
      }
      if (a.title > b.title) {
        return -1;
      }
      if (a.title < b.title) {
        return 1;
      }
    });
  };
  // sort --- Lowest prices
  const sortByLowestPrice = (arr) => {
    return arr.sort((a, b) => {
      return a.price - b.price;
    });
  };
  // sort --- Highest prices
  const sortByHighestPrice = (arr) => {
    return arr.sort((a, b) => {
      return b.price - a.price;
    });
  };

  if (filterValue === 'asc') {
    if (productData) {
      ascendingOrder(productData);
    }
  }
  if (filterValue === 'desc') {
    if (productData) {
      descendingOrder(productData);
    }
  }
  if (filterValue === 'Highestprice') {
    if (productData) {
      sortByHighestPrice(productData);
    }
  }
  if (filterValue === 'Lowestprice') {
    if (productData) {
      sortByLowestPrice(productData);
    }
  }

  const items = [
    <img src={BANNER} alt='banner' />,
    <img src={BANNER2} alt='banner' />,
    <img src={BANNER3} alt='banner' />,
    <img src={BANNER4} alt='banner' />,
  ];

  useEffect(() => {
    setDocTitle('Wishopa - all products');
  }, [productData]);

  return (
    <section className='section product-page-section'>
      <div className='url-slug container'>
        <p>
          / <Link to='/'>home</Link>
        </p>
      </div>
      <div className='banner container'>
        <AliceCarousel
          autoPlay
          items={items}
          infinite
          disableButtonsControls
          disableDotsControls
          animationDuration={1000}
          autoPlayInterval={2000}
          animationType='fadeout'
        />
      </div>
      <div className='all-products-data'>
        <div className='onload container'>
          {isLoading ? (
            <div className='loading'>
              <img src={LOADER} alt='loading' />
            </div>
          ) : null}
          {isError ? (
            <div className='loading'>
              <img src={ERROR} alt='loading' />
              <button onClick={refetch} className='retry-btn'>
                Retry
              </button>
            </div>
          ) : null}
        </div>

        <div className='all-products-wrapper'>
          <div className='all-products-content container'>
            {data && (
              <div className='el-wrapper'>
                <p className='no-of-product'>
                  <span style={{ color: '#5b5fdf' }}>
                    ({handleSearch(productData, searchTerms).length})
                  </span>{' '}
                  Products
                </p>
                <div className='search-wrapper'>
                  <div className='search-card'>
                    <span>
                      {' '}
                      <FiSearch />{' '}
                    </span>
                    <input
                      type='text'
                      name='search'
                      onChange={(e) => setSearchTerms(e.target.value)}
                      placeholder='search  for products...'
                      value={searchTerms}
                    />
                  </div>
                </div>
                {/* FILTER  */}
                <FormControl variant='filled'>
                  <InputLabel>Sort By</InputLabel>
                  <Select
                    className='select'
                    onChange={(e) => setFilterValue(e.target.value)}
                  >
                    <MenuItem value='asc'>A - Z</MenuItem>
                    <MenuItem value='desc'>Z - A</MenuItem>
                    <MenuItem value='Lowestprice'>Lowest Prices</MenuItem>
                    <MenuItem value='Highestprice'>Highest Prices</MenuItem>
                  </Select>
                </FormControl>
              </div>
            )}
            <div className='all-products'>
              {data &&
                handleSearch(productData, searchTerms).map((product) => {
                  const id = product.id;
                  const title = product.title;
                  const image = product.image;
                  const price = product.price;
                  return (
                    <article
                      key={id}
                      className='product-card'
                      onClick={() => {
                        history.push(`/products/${id}`);
                        window.scrollTo(0, 0);
                      }}
                    >
                      <div className='product-img-wrap'>
                        <img src={image} alt={title} />
                      </div>
                      <div className='info'>
                        <h1 className='product-name'>{title}</h1>
                        <p className='price'>
                          <span> ${price}</span>${(price * 0.75).toFixed(2)}
                        </p>
                        <button className='product-details-btn'>
                          Shop Item
                        </button>
                      </div>
                    </article>
                  );
                })}
            </div>
            {/* search result not found */}
            {data && handleSearch(productData, searchTerms).length === 0 && (
              <p className='no-item-found'>"No Product found!!"</p>
            )}
          </div>
          <Offer />
          <Newsletter />
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
