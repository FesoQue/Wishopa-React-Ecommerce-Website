import React, { useState, useRef } from 'react';
import { TextField, Box, Button } from '@material-ui/core';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import GoogleButton from 'react-google-button';
import { Link, useHistory } from 'react-router-dom';
import { useAppContext } from '../Context/context';
import toast, { Toaster } from 'react-hot-toast';

const Signup = () => {
  const history = useHistory();
  // => context
  const { handleSignup } = useAppContext();

  // => FORMIK / YUP
  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validateEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSubmit = (values, props) => {
    const email = values.email;
    const password = values.password;

    toast.promise(handleSignup(email, password), {
      success: (data) => 'Account successfully created',
      error: (err) => `This just happened: ${err.toString()}`,
    });
    history.push('/checkout');
    props.resetForm();
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .matches(validateEmail, 'email is not a valid one')
      .required('email cannot be blank'),

    password: Yup.string()
      .required('password cannot be blank')
      .min(6, 'password should be min of 6 characters'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'password does not match')
      .required('confirm your password'),
  });

  return (
    <section className='auth section'>
      <div className='auth-wrapper container'>
        <div className='auth-card'>
          <div className='auth-header'>
            <h1>Sign Up for Wishopa</h1>
            <p>Create your free account</p>
            <p className='guestcheckout'>
              <span>or</span>
              <Link to='/guest-checkout' className='guestcheckout-link'>
                continue as guest
              </Link>
            </p>
          </div>
          <div className='auth-form'>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {(props) => (
                <Form>
                  <Box className='auth-box'>
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
                      name='password'
                      type='password'
                      variant='outlined'
                      label='Password'
                      as={TextField}
                      fullWidth
                      helperText={<ErrorMessage name='password' />}
                      required
                      error={props.errors.password && props.touched.password}
                    />
                    <Field
                      name='confirmPassword'
                      type='password'
                      variant='outlined'
                      label='Confirm Password'
                      as={TextField}
                      fullWidth
                      helperText={<ErrorMessage name='confirmPassword' />}
                      required
                      error={
                        props.errors.confirmPassword &&
                        props.touched.confirmPassword
                      }
                    />
                    <Button variant='contained' type='submit' fullWidth>
                      Sign up
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
            <div className='google-btn'>
              <div>
                <span className='line'></span>
                <span style={{ color: '#979696' }}>or sign in with</span>
                <span className='line'></span>
              </div>
              <GoogleButton style={{ width: '100%', color: '#fff' }} />
            </div>
            <div className='need-acct'>
              <p>
                Already have an account?
                <span>
                  {' '}
                  <Link to='/signin'>Sign In</Link>{' '}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </section>
  );
};

export default Signup;
