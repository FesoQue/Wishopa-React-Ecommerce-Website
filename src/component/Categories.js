import React from 'react';
import CATEGORY_1 from '../images/cat1.png';
import CATEGORY_2 from '../images/cat2a.png';
import CATEGORY_3 from '../images/cat3.png';
import CATEGORY_4 from '../images/cat4.png';
import { useHistory } from 'react-router-dom';
import './App.css';

const Categories = () => {
  const history = useHistory();
  return (
    <section>
      <div className='content category-contents container'>
        <div className='title'>
          <h2>Category</h2>
        </div>
        <p className='subtext'>Shop items by category</p>
        <div className='categories'>
          <ul className='category-cards'>
            {/* 1 */}
            <li
              data-category="men's clothing"
              onClick={(e) => {
                history.push(`/${e.currentTarget.dataset.category}`);
                window.scrollTo(0, 0);
              }}
            >
              <article className='card' tabIndex='0'>
                <h3>Men's Wear</h3>
                <div
                  className='card-img-wrap
                '
                >
                  <img src={CATEGORY_1} alt="men's cloth" />
                </div>
              </article>
            </li>
            {/* 2 */}
            <li
              data-category="women's clothing"
              onClick={(e) => {
                history.push(`/${e.currentTarget.dataset.category}`);
                window.scrollTo(0, 0);
              }}
            >
              <article className='card'>
                <h3>Women's Wear</h3>
                <div
                  className='card-img-wrap
                '
                >
                  <img src={CATEGORY_2} alt="women's cloth" />
                </div>
              </article>
            </li>
            {/* 3 */}
            <li
              data-category='electronics'
              onClick={(e) => {
                history.push(`/${e.currentTarget.dataset.category}`);
                window.scrollTo(0, 0);
              }}
            >
              <article className='card'>
                <h3>Gadgets</h3>
                <div
                  className='card-img-wrap
                '
                >
                  <img src={CATEGORY_3} alt='gadgets' />
                </div>
              </article>
            </li>
            {/* 4 */}
            <li
              data-category='jewelery'
              onClick={(e) => {
                history.push(`/${e.currentTarget.dataset.category}`);
                window.scrollTo(0, 0);
              }}
            >
              <article className='card'>
                <h3>Jewelry</h3>
                <div
                  className='card-img-wrap
                '
                >
                  <img src={CATEGORY_4} alt='jewellery' />
                </div>
              </article>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Categories;
