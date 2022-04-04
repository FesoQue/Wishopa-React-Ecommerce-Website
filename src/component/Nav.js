import React, { useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { FaCaretDown } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import './App.css';
import { useAppContext } from '../Context/context';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  white: {
    backgroundColor: 'white',
    color: '#5b5fdf',
  },
}));

const Nav = () => {
  const classes = useStyles();
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);

  const { handleOpenSidebar, uniqueItem, currentUser, handleSignout } =
    useAppContext();

  const handleUserSignout = () => {
    handleSignout();
    history.push('/');
  };

  return (
    <header>
      <nav className='container d-flex'>
        <div className='col-1'>
          {/* hamburger menu icon */}
          <button className='menu-btn' onClick={() => handleOpenSidebar()}>
            <HiMenu className='hamburger' />
          </button>
          <h1 className='logo'>
            <Link to='/'>Wishopa</Link>
          </h1>
        </div>
        {/* desktop menu */}
        <div className='xl-nav-menu'>
          <ul className='xl-menu'>
            <li>
              <Link
                to='/products'
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                Products
              </Link>
            </li>
            {/* categories */}
            <li>
              <button>
                Categories{' '}
                <span>
                  <FaCaretDown />
                </span>{' '}
              </button>
              <ul className='category-sublink'>
                <li>
                  <Link
                    to="/men's clothing"
                    onClick={() => {
                      window.scrollTo(0, 0);
                    }}
                  >
                    Men's Clothing
                  </Link>
                </li>
                <li>
                  <Link
                    to="/women's clothing"
                    onClick={() => {
                      window.scrollTo(0, 0);
                    }}
                  >
                    women's Clothing
                  </Link>
                </li>
                <li>
                  <Link
                    to='/electronics'
                    onClick={() => {
                      window.scrollTo(0, 0);
                    }}
                  >
                    Gadgets
                  </Link>
                </li>
                <li>
                  <Link
                    to='/jewelery'
                    onClick={() => {
                      window.scrollTo(0, 0);
                    }}
                  >
                    Jewelry
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                to='/contact-us'
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                Contact us
              </Link>
            </li>
          </ul>
        </div>
        <div className='col-2'>
          {/* cart icon */}
          <button
            className='cartIcon'
            onClick={() => {
              history.push('/shopping-cart');
              window.scrollTo(0, 0);
            }}
          >
            <svg
              width='30'
              height='30'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M12 2C10.3431 2 8.99997 3.34315 8.99997 5H15C15 3.34315 13.6568 2 12 2ZM15 7V8C15 8.55228 15.4477 9 16 9C16.5522 9 17 8.55228 17 8V7H18.2215C18.7286 7 19.1554 7.37955 19.2146 7.88316L20.744 20.8832C20.814 21.4777 20.3495 22 19.7509 22H4.24905C3.65046 22 3.18596 21.4777 3.2559 20.8832L4.78531 7.88316C4.84456 7.37955 5.27138 7 5.77846 7H6.99997V8C6.99997 8.55228 7.44768 9 7.99997 9C8.55225 9 8.99997 8.55228 8.99997 8V7H15ZM6.99997 5H5.77846C4.25721 5 2.97676 6.13864 2.79901 7.64948L1.2696 20.6495C1.05978 22.433 2.45327 24 4.24905 24H19.7509C21.5467 24 22.9402 22.433 22.7303 20.6495L21.2009 7.64948C21.0232 6.13864 19.7427 5 18.2215 5H17C17 2.23858 14.7614 0 12 0C9.23854 0 6.99997 2.23858 6.99997 5Z'
                fill='#fff'
              />
            </svg>
            <span>{uniqueItem.length}</span>
          </button>
          {currentUser ? (
            <div className='user-avatar' onClick={() => setIsOpen(!isOpen)}>
              <Avatar
                className={classes.white}
                id='avatar'
                src={currentUser.photoURL && currentUser.photoURL}
              />
              <ul className={`${isOpen ? 'show-widget' : null}`}>
                <li
                  onClick={() => {
                    history.push('/profile');
                    setIsOpen(!isOpen);
                    window.scrollTo(0, 0);
                  }}
                >
                  <button>Profile</button>
                </li>
                <li onClick={() => setIsOpen(!isOpen)}>
                  <button onClick={handleUserSignout}>Log Out</button>
                </li>
              </ul>
            </div>
          ) : (
            // login
            <button
              onClick={() => {
                history.push('/signin');
                window.scrollTo(0, 0);
              }}
              className='auth-btn'
            >
              Login
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
