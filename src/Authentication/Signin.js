import React, { useEffect } from 'react';
import { TextField, Box, Button } from '@material-ui/core';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import GoogleButton from 'react-google-button';
import { Link, useHistory } from 'react-router-dom';
import { useAppContext } from '../Context/context';
import toast, { Toaster } from 'react-hot-toast';

const Signin = () => {
  const history = useHistory();

  // => CONTEXT
  const { handleSignin, signInWithGoogle, currentUser, setDocTitle } =
    useAppContext();

  // => FORMIK / YUP
  const initialValues = {
    email: '',
    password: '',
  };

  const validateEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSubmit = (values, props) => {
    const email = values.email;
    const password = values.password;

    toast.promise(handleSignin(email, password), {
      success: (data) => `Sign in successful, welcome ${data.user.displayName}`,
      error: (err) => `${err.toString()}`,
    });
  };

  if (currentUser) {
    history.push('/');
    window.scrollTo(0, 0);
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .matches(validateEmail, 'email is not a valid one')
      .required('email cannot be blank'),

    password: Yup.string()
      .required('password cannot be blank')
      .min(6, 'password should be min of 6 characters'),
  });

  useEffect(() => {
    setDocTitle('Wishopa - SignIn');
  }, []);

  return (
    <section className='auth section'>
      <div className='auth-wrapper container'>
        <div className='auth-card'>
          <div className='auth-header'>
            <h1>Sign In to Wishopa</h1>
            <p>Get the best Wishopa experience by signing in!</p>
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
                    <Button variant='contained' type='submit' fullWidth>
                      Sign In
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
            <div className='google-btn'>
              <div>
                <span className='line'></span>
                <span style={{ color: '#979696' }}>or</span>
                <span className='line'></span>
              </div>
              <GoogleButton
                style={{ width: '100%', color: '#fff' }}
                onClick={signInWithGoogle}
              />
            </div>
            <div className='need-acct'>
              <p>
                Need an account?
                <span>
                  {' '}
                  <Link to='/signup'>Sign Up</Link>{' '}
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

export default Signin;
