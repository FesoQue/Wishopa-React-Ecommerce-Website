import React, { useState } from 'react';
import { Box, Button, TextField } from '@material-ui/core';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useAppContext } from '../Context/context';
import * as Yup from 'yup';
import { MdOutlineArrowBack } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { PaystackButton } from 'react-paystack';
import { RiInformationLine } from 'react-icons/ri';
import { useEffect } from 'react';
import { db } from '../Authentication/firebase-config';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

const Checkout = () => {
  const history = useHistory();

  // => STATES
  const [isCheckoutBtn, setIsCheckoutBtn] = useState(false);

  // => CONTEXT
  const {
    uniqueItem,
    total,
    currentUser,
    info,
    setInfo,
    handleFormLocalStorage,
    setDocTitle,
  } = useAppContext();

  //  => PAYSTACK
  const publicKey = process.env.REACT_APP_PAYSTACK_KEY;
  const checkoutEmail = currentUser?.email;
  const amount = total * 1000;

  const componentProps = {
    checkoutEmail,
    amount,
    metadata: {
      // name
      //phone
    },
    publicKey,
    text: 'Checkout Now',
    currency: 'USD',
    onSuccess: () => {
      // handleSummary();
      alert('success');
    },
    onClose: () => alert(`Wait! Don't leave ${checkoutEmail}:(`),
  };

  // => FORMIK / YUP
  const handleSubmit = (values, props) => {
    setInfo({
      ...info,
      fullName: values.fullName,
      phoneNumber: values.phoneNumber,
      country: values.country,
      state: values.country,
      city: values.city,
      address: values.address,
    });

    // => SAVING USERS INFO TO DB
    const docRef = doc(db, 'users', `${currentUser?.uid}`);
    setDoc(docRef, {
      name: values.fullName,
      email: currentUser?.email,
      tel: values.phoneNumber,
      country: values.country,
      state: values.state,
      city: values.city,
      address: values.address,
      cart: uniqueItem,
      timeStamp: serverTimestamp(),
    });
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(8, 'name should not be less than 8 characters')
      .required('name cannot be blank'),

    phoneNumber: Yup.string().required('phone number cannot be blank'),

    address: Yup.string()
      .min(8, 'enter valid address')
      .required('address cannot be blank'),

    country: Yup.string().required('country cannot be blank'),

    state: Yup.string().required('state cannot be blank'),

    city: Yup.string().required('city cannot be blank'),
  });

  useEffect(() => {
    if (
      info.fullName &&
      info.phoneNumber &&
      info.country &&
      info.state &&
      info.city &&
      info.address
    ) {
      setIsCheckoutBtn(true);
    } else {
      setIsCheckoutBtn(false);
    }
    localStorage.setItem('formValues', JSON.stringify(info));
  }, [info]);

  useEffect(() => {
    setDocTitle('Wishopa - Checkout');
  }, []);

  return (
    <div className='checkout-section section'>
      <div className='checkout-content container'>
        <div className='checkout-content-col-1'>
          <div className='checkout-form'>
            <Formik
              initialValues={handleFormLocalStorage()}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {(props) => (
                <Form noValidate autoComplete='off'>
                  {/* personal info */}
                  <Box className='checkout-info-box'>
                    <div className='checkout-header'>
                      <div className='checkout-title'>
                        <span onClick={() => history.push('/shopping-cart')}>
                          <MdOutlineArrowBack />
                        </span>
                        <h1>Checkout</h1>
                      </div>
                      <span className='user-email'>{currentUser?.email}</span>
                    </div>
                    <h2>Personal Information</h2>
                    <Field
                      name='fullName'
                      type='fullName'
                      label='Full Name'
                      fullWidth
                      as={TextField}
                      variant='outlined'
                      helperText={<ErrorMessage name='fullName' />}
                      required
                      error={props.errors.fullName && props.touched.fullName}
                      inputProps={{ readOnly: isCheckoutBtn }}
                    />
                    <Field
                      name='email'
                      type='email'
                      label='email'
                      fullWidth
                      as={TextField}
                      variant='outlined'
                      value={currentUser?.email}
                      required
                      inputProps={{ readOnly: true }}
                    />
                    <Field
                      name='phoneNumber'
                      type='number'
                      variant='outlined'
                      label='Phone Number'
                      as={TextField}
                      fullWidth
                      helperText={<ErrorMessage name='phoneNumber' />}
                      required
                      error={
                        props.errors.phoneNumber && props.touched.phoneNumber
                      }
                      inputProps={{ readOnly: isCheckoutBtn }}
                    />

                    <h2>Shipping Address</h2>
                    <Field
                      name='country'
                      type='country'
                      label='country'
                      fullWidth
                      as={TextField}
                      variant='outlined'
                      helperText={<ErrorMessage name='country' />}
                      required
                      error={props.errors.country && props.touched.country}
                      inputProps={{ readOnly: isCheckoutBtn }}
                    />
                    <Field
                      name='state'
                      type='state'
                      label='state'
                      fullWidth
                      as={TextField}
                      variant='outlined'
                      helperText={<ErrorMessage name='state' />}
                      required
                      error={props.errors.state && props.touched.state}
                      inputProps={{ readOnly: isCheckoutBtn }}
                    />
                    <Field
                      name='city'
                      type='city'
                      variant='outlined'
                      label='city'
                      as={TextField}
                      fullWidth
                      helperText={<ErrorMessage name='city' />}
                      required
                      error={props.errors.city && props.touched.city}
                      inputProps={{ readOnly: isCheckoutBtn }}
                    />
                    <Field
                      name='address'
                      type='address'
                      label='address'
                      fullWidth
                      as={TextField}
                      variant='outlined'
                      helperText={<ErrorMessage name='address' />}
                      required
                      error={props.errors.address && props.touched.address}
                      inputProps={{ readOnly: isCheckoutBtn }}
                    />
                    {!isCheckoutBtn ? (
                      <div className='warning-info'>
                        <span style={{ color: 'red' }}>
                          <RiInformationLine />
                        </span>
                        <span>
                          Please ensure all information provided <br /> is
                          correct before you proceed
                        </span>
                      </div>
                    ) : null}
                    {isCheckoutBtn ? (
                      <span id='checkout-now-btn'>
                        {uniqueItem.length > 0 ? (
                          <PaystackButton {...componentProps} disabled='true' />
                        ) : (
                          <div className='warning-info'>
                            <span style={{ fontSize: '18px' }}>
                              <RiInformationLine />
                            </span>
                            <span>add item(s) to cart to checkout</span>
                          </div>
                        )}
                      </span>
                    ) : (
                      <Button
                        variant='contained'
                        type='submit'
                        fullWidth
                        id='checkout-btn'
                      >
                        confirm info
                      </Button>
                    )}
                  </Box>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div className='checkout-content-col-2'>
          <div className='summary-wrapper'>
            <h3>Order summary</h3>
            <div className='cart-cost'>
              {/* 1 */}
              <div>
                <p>subtotal</p>
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
                <p>estimated total</p>
                <p>${(total * 0.75).toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
