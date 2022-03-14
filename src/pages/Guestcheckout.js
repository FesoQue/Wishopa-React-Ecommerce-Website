import React from 'react';
import { Box, Button, TextField } from '@material-ui/core';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useAppContext } from '../Context/context';
import * as Yup from 'yup';
import { MdOutlineArrowBack } from 'react-icons/md';
import { useHistory } from 'react-router-dom';

const Guestcheckout = () => {
  const history = useHistory();

  const { uniqueItem, total } = useAppContext();

  // paystack
  /* const publicKey = 'pk_test_fccce0bd935b9aa330b4cc1576cd0adeb194c4c6';
  const amount = total * 100;
  const componentProps = {
    email,
    amount,
    metadata: {
      name,
    },
    publicKey,
    text: 'Checkout',
    onSuccess: () => {
      handleSummary();
    },
    onClose: () => alert(`Wait! Don't leave ${name}:(`),
  };*/

  // => FORMIK / YUP
  const initialValues = {
    fullName: '',
    email: '',
    phoneNumber: '',
    country: '',
    state: '',
    city: '',
    address: '',
  };

  const handleSubmit = (values, props) => {
    const email = values.email;
    const password = values.password;
    props.resetForm();
  };

  const validateEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const phoneRegexExp = /^([0]{1})[0-9]{10}$/;

  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(8, 'name should be min of 8 characters')
      .required('name cannot be blank'),

    email: Yup.string()
      .matches(validateEmail, 'email cannot be blank')
      .required('email cannot be blank'),

    phoneNumber: Yup.string()
      .matches(phoneRegexExp, 'enter valid phone number')
      .required('phone number cannot be blank'),

    address: Yup.string()
      .min(8, 'enter valid address')
      .required('address cannot be blank'),

    country: Yup.string().required('country cannot be blank'),

    state: Yup.string()
      .min(8, 'enter valid address')
      .required('state cannot be blank'),

    city: Yup.string().required('city cannot be blank'),
  });

  return (
    <div className='checkout-section section'>
      <div className='checkout-content container'>
        <div className='checkout-content-col-1'>
          <div className='checkout-form'>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {(props) => (
                <Form noValidate autoComplete='off'>
                  {/* personal info */}
                  <Box className='checkout-info-box'>
                    <div className='checkout-title'>
                      <span onClick={() => history.push('/shopping-cart')}>
                        <MdOutlineArrowBack />
                      </span>
                      <h1>Checkout</h1>
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
                    />
                    <Field
                      name='email'
                      type='email'
                      label='Email'
                      fullWidth
                      as={TextField}
                      variant='outlined'
                      helperText={<ErrorMessage name='email' />}
                      required
                      error={props.errors.email && props.touched.email}
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
                    />
                    <Button
                      variant='contained'
                      type='submit'
                      fullWidth
                      id='guest-checkout-btn'
                      disabled={uniqueItem.length > 0 ? false : true}
                    >
                      CHECKOUT
                    </Button>
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

export default Guestcheckout;
