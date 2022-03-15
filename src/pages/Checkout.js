import React, { useState } from 'react';
import { Box, Button, TextField } from '@material-ui/core';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useAppContext } from '../Context/context';
import * as Yup from 'yup';
import { MdOutlineArrowBack } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { PaystackButton } from 'react-paystack';
import { useEffect } from 'react';
import { RiInformationLine } from 'react-icons/ri';
import { db } from '../Authentication/firebase-config';
import { doc, setDoc, updateDoc } from 'firebase/firestore';

const Checkout = () => {
  const history = useHistory();

  // => CONTEXT
  const { uniqueItem, total, currentUser, error } = useAppContext();

  // => STATES
  const [isCheckoutBtn, setIsCheckoutBtn] = useState(false);
  const [checkoutEmail, setCheckoutEmail] = useState();
  const [info, setInfo] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    country: '',
    state: '',
    city: '',
    address: '',
  });

  // => FIREBASE COLLECTION
  // if(currentUser) {

  //   const userDocRef = db.collection('users').doc(currentUser?.uid);

  // }

  // => LOCAL STORAGE
  const handleLocalStorage = () => {
    const checkoutInfo = localStorage.getItem('formValues');
    if (checkoutInfo) {
      return JSON.parse(localStorage.getItem('formValues'));
    } else {
      return {
        fullName: '',
        email: '',
        phoneNumber: '',
        country: '',
        state: '',
        city: '',
        address: '',
      };
    }
  };

  //  => PAYSTACK

  // const publicKey = 'pk_test_40ca856dda3ee8570a4b5750f229089099d51050';
  const publicKey = process.env.REACT_APP_PAYSTACK_KEY;
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
      email: values.email,
      phoneNumber: values.phoneNumber,
      country: values.country,
      state: values.country,
      city: values.city,
      address: values.address,
    });

    // => SAVING USERS INFO TO DB
    const docRef = doc(db, 'users', `${currentUser?.uid}`);
    setDoc(
      docRef,
      {
        name: values.fullName,
        email: values.email,
        tel: values.phoneNumber,
        country: values.country,
        state: values.state,
        city: values.city,
        address: values.address,
        itemInCart: uniqueItem.length,
      }
      // { merge: true }
    );
  };

  const validateEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(8, 'name should not be less than 8 characters')
      .required('name cannot be blank'),

    email: Yup.string()
      .matches(validateEmail, 'email is not valid')
      .required('email cannot be blank'),

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
      info.email &&
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
    if (currentUser) {
      setCheckoutEmail(currentUser?.email);
    }
  }, [currentUser]);

  return (
    <div className='checkout-section section'>
      <div className='checkout-content container'>
        <div className='checkout-content-col-1'>
          <div className='checkout-form'>
            <Formik
              initialValues={handleLocalStorage()}
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
                      helperText={<ErrorMessage name='email' />}
                      required
                      error={props.errors.email && props.touched.email}
                      inputProps={{ readOnly: isCheckoutBtn }}
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
                          Please ensure all information provided is correct
                          before proceeding
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
