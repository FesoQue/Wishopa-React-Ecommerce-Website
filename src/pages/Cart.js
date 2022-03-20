import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';
import { FcLock } from 'react-icons/fc';
import { useAppContext } from '../Context/context';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

const Cart = () => {
  const history = useHistory();

  const {
    uniqueItem,
    handleIncreaseItem,
    handleDecreaseItem,
    handleRemoveItem,
    total,
    setDocTitle,
  } = useAppContext();

  const handleRemoveFn = (id) => {
    handleRemoveItem(id);
    toast.error('item removed from cart');
  };

  const handleCheckout = () => {
    history.push('/checkout');
  };

  useEffect(() => {
    setDocTitle('Wishopa - Cart');
  }, []);

  return (
    <main>
      <section className='section'>
        <div className='cart-wrapper container'>
          <div className='url-slug'>
            <p>
              / <Link to='/'>home</Link>
            </p>
          </div>
          <div className='cart-content-wrapper'>
            <div className='cart-content'>
              <div className='cart-content-col-1'>
                <table>
                  <thead>
                    <tr>
                      <th className='cart-prod-desc'>
                        <h4>
                          <span style={{ color: '#5b5fdf' }}>
                            ({uniqueItem.length})
                          </span>{' '}
                          PRODUCT
                        </h4>
                      </th>
                      <th>
                        <h4>PRICE</h4>
                      </th>
                      <th>
                        <h4>QUANTITY</h4>
                      </th>
                      <th>
                        <h4>TOTAL</h4>
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  {uniqueItem.length !== 0 ? (
                    uniqueItem.map((item) => {
                      const { id, image, title, price, quantity } = item;
                      return (
                        <tbody key={id}>
                          <tr>
                            <td className='cart-prod-desc'>
                              <img src={image} alt='product' />
                              <p>{title}</p>
                            </td>
                            <td>
                              <p>
                                <span
                                  style={{
                                    fontWeight: '500',
                                    color: '#5b5fdf',
                                  }}
                                >
                                  ${(price * 0.75).toFixed(2)}
                                </span>
                              </p>
                            </td>
                            <td>
                              <button
                                className='amount-btn'
                                onClick={() => handleIncreaseItem(id)}
                              >
                                <span>
                                  <FaCaretUp />
                                </span>
                              </button>

                              <p className='amount'>{quantity}</p>
                              <button
                                className='amount-btn'
                                onClick={() => handleDecreaseItem(id)}
                              >
                                <span>
                                  <FaCaretDown />
                                </span>
                              </button>
                            </td>
                            <td>
                              <p style={{ fontWeight: '500' }}>
                                ${(price * 0.75 * quantity).toFixed(2)}
                              </p>
                            </td>
                            <td className='delete'>
                              <button onClick={() => handleRemoveFn(id)}>
                                <span>
                                  <AiFillDelete />
                                </span>{' '}
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      );
                    })
                  ) : (
                    <tbody>
                      <tr>
                        <td colSpan='4' className='cart-empty'>
                          <p>your cart is currently empty</p>
                        </td>
                      </tr>
                    </tbody>
                  )}
                </table>
              </div>
              <div className='cart-content-col-2'>
                <div className='summary-wrapper'>
                  <h3>Order summary</h3>
                  <div className='cart-cost'>
                    {/* 1 */}
                    <div>
                      <p>sub Total</p>
                      <p>${(total * 0.75).toFixed(2)}</p>
                    </div>
                    {/* 2 */}
                    <div>
                      <p>shipping</p>
                      <p>FREE</p>
                    </div>
                    {/* 3 */}
                    <div>
                      <p>estimated taxes</p>
                      <p>${(total * 0.75 * 0.15).toFixed(2)}</p>
                    </div>
                    {/* 4 */}
                    <div>
                      <p>cart total</p>
                      <p>${(total * 0.75).toFixed(2)}</p>
                    </div>
                  </div>
                  <div className='checkout-btn-wrapper'>
                    <button onClick={handleCheckout}>
                      Procced To Checkout
                    </button>
                  </div>
                  <div className='checkout-tagline'>
                    <div>
                      <span>
                        <FcLock />
                      </span>
                    </div>
                    <div>
                      <h4>Secure Checkout</h4>
                      <p>shipping is always safe and secure</p>
                    </div>
                  </div>
                </div>
              </div>
              <Toaster />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Cart;
