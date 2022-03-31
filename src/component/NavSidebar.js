import React from 'react';
import { FaCaretDown } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import { useAppContext } from '../Context/context';

const NavSidebar = () => {
  const { isSidebarOpen, handleCloseSidebar } = useAppContext();

  const closeSidebar = (e) => {
    if (e.target.classList.contains('show-sidebar')) {
      handleCloseSidebar();
    }
  };

  return (
    <aside
      className={`${isSidebarOpen ? 'mobile-nav show-sidebar' : 'mobile-nav'}`}
      onClick={closeSidebar}
    >
      <nav className='mobile-nav-content slidein'>
        <div className='mobile-nav-header'>
          <button className='close-btn' onClick={() => handleCloseSidebar()}>
            <span>
              <GrClose />
            </span>
          </button>
          <h1 className='logo'>
            <Link to='/'>Wishopa</Link>
          </h1>
        </div>
        <ul className='mobile-nav-list'>
          {/* home */}
          <li className='mobile-nav-item'>
            <Link
              to='/'
              className='mobile-nav-link'
              onClick={() => handleCloseSidebar()}
            >
              Home
            </Link>
          </li>
          {/* products */}
          <li className='mobile-nav-item'>
            <Link
              to='/products'
              className='mobile-nav-link'
              onClick={() => {
                handleCloseSidebar();
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
                    handleCloseSidebar();
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
                    handleCloseSidebar();
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
                    handleCloseSidebar();
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
                    handleCloseSidebar();
                    window.scrollTo(0, 0);
                  }}
                >
                  Jewelry
                </Link>
              </li>
            </ul>
          </li>
          {/* contact us */}
          <li className='mobile-nav-item'>
            <Link
              to='/contact-us'
              className='mobile-nav-link'
              onClick={() => {
                handleCloseSidebar();
                window.scrollTo(0, 0);
              }}
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default NavSidebar;
