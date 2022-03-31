import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import BANNER from '../images/men-banner.png';
import BANNER2 from '../images/women-banner.png';
import BANNER3 from '../images/gadget-banner.png';
import BANNER4 from '../images/jewelery-banner.png';
import LOADER from '../images/rippe-loading.gif';
import ERROR from '../images/error.gif';
import Newsletter from '../component/Newsletter';
import Offer from '../component/Offer';
import { useCategoryData } from '../QueryHooks/useFetchCategory';
import './Pages.css';
import { useHistory } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { useAppContext } from '../Context/context';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

const Categorypage = () => {
  const { name } = useParams();

  const history = useHistory();

  const [searchTerms, setSearchTerms] = useState('');
  const [filterValue, setFilterValue] = useState('');

  // useQuery fn
  const { data, isLoading, isError, refetch } = useCategoryData(name);

  // useContext
  const { handleSearch, setDocTitle } = useAppContext();
  const productData = data?.data;

  if (productData) {
    handleSearch(productData, searchTerms);
  }

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

  useEffect(() => {
    setDocTitle(`Wishopa - ${name}`);
  }, [productData]);

  return (
    <section className='section category-page-section'>
      <div className='url-slug container'>
        <p>
          / <Link to='/'>home</Link> / {name}
        </p>
      </div>
      <div className='banner container'>
        {name === "men's clothing" && <img src={BANNER} alt='banner' />}
        {name === "women's clothing" && <img src={BANNER2} alt='banner' />}
        {name === 'electronics' && <img src={BANNER3} alt='banner' />}
        {name === 'jewelery' && <img src={BANNER4} alt='banner' />}
      </div>
      {/* data */}
      <div className='specific-category'>
        <div className='onload container'>
          {isLoading ? (
            <div className='loading'>
              <img src={LOADER} alt='loading' />
            </div>
          ) : null}
          {isError ? (
            <div className='loading error-gif'>
              <img src={ERROR} alt='loading' />
              <button onClick={refetch} className='retry-btn'>
                Retry
              </button>
            </div>
          ) : null}
        </div>
        <div className='specific-category-wrapper'>
          <div className='specific-category-content container'>
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
                      placeholder='search  for products...'
                      onChange={(e) => setSearchTerms(e.target.value)}
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
            <div className='category-products'>
              {data &&
                handleSearch(productData, searchTerms).map((product) => {
                  const id = product.id;
                  const title = product.title;
                  const image = product.image;
                  const price = product.price;
                  return (
                    <article
                      onClick={() => {
                        history.push(`/products/${id}`);
                        window.scrollTo(0, 0);
                      }}
                      key={id}
                      className='product-card'
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

export default Categorypage;
