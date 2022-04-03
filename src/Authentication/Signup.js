import React, { useEffect } from 'react';
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
  const { handleSignup, signInWithGoogle, currentUser, setDocTitle } =
    useAppContext();

  // => FORMIK / YUP
  const initialValues = {
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validateEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSubmit = (values, props) => {
    const userName = values.userName;
    const email = values.email;
    const password = values.password;

    toast.promise(handleSignup(email, password, userName), {
      success: (data) => 'Account successfully created',
      error: (err) => `This just happened: ${err.toString()}`,
    });
  };

  if (currentUser) {
    history.push('/');
    window.scrollTo(0, 0);
  }

  // => FORMIK / YUP
  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .required('username cannot be blank')
      .min(3, 'username should be min of 3 characters'),

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

  useEffect(() => {
    setDocTitle('Wishopa - SignUp');
  }, []);

  return (
    <section className='auth section'>
      <div className='auth-wrapper container'>
        <div className='auth-card'>
          <div className='auth-header'>
            <h1>Sign Up for Wishopa</h1>
            <p>Create your free account</p>
          </div>

          <div className='auth-form'>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {(props) => (
                <Form noValidate autoComplete='off'>
                  <Box className='auth-box'>
                    <Field
                      name='userName'
                      type='username'
                      label='Username'
                      fullWidth
                      as={TextField}
                      variant='outlined'
                      helperText={<ErrorMessage name='userName' />}
                      required
                      error={props.errors.userName && props.touched.userName}
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
                <span style={{ color: '#979696' }}>or </span>
                <span className='line'></span>
              </div>
              <GoogleButton
                style={{ width: '100%', color: '#fff' }}
                onClick={signInWithGoogle}
              />
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
