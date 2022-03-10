import React from 'react';
import { TextField, Box, Button, TextareaAutosize } from '@material-ui/core';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Contact = () => {
  const initialValues = {
    email: '',
    name: '',
    message: '',
  };

  const validateEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSubmit = (values, props) => {
    alert(JSON.stringify(values), null, 2);
    props.resetForm();
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('name cannot be blank')
      .min(4, 'name is too short'),

    email: Yup.string()
      .matches(validateEmail, 'email is not a valid one')
      .required('email cannot be blank'),

    message: Yup.string()
      .required('message cannot be blank')
      .min(10, 'message is to short'),
  });

  return (
    <section className='section contact-section'>
      <div className=''>
        <div className='contact-content-wrapper container'>
          <div className='contact-content-col-1'>
            <div>
              <div className='tag-title'>
                <span></span>
                <p>CONTACT US</p>
              </div>
              <h1>
                Contact our Support <br /> and Sales team
              </h1>
              <p>
                Need to get in touch with the team? Kindly fill out the form and
                we'll be in touch as soon as possible
              </p>
            </div>
          </div>
          <div className='contact-content-col-2'>
            <div className='form'>
              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                {(props) => (
                  <Form noValidate>
                    <Box className='box'>
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
                        name='name'
                        type='name'
                        variant='outlined'
                        label='Full Name'
                        as={TextField}
                        fullWidth
                        helperText={<ErrorMessage name='name' />}
                        required
                        error={props.errors.name && props.touched.name}
                      />
                      <Field
                        type='message'
                        name='message'
                        as={TextareaAutosize}
                        aria-label='message'
                        minRows={5}
                        placeholder='Your message'
                        style={{ width: '100%' }}
                        helperText={<ErrorMessage name='message' />}
                        required
                        error={props.errors.message && props.touched.message}
                      />

                      <Button
                        variant='contained'
                        type='submit'
                        fullWidth
                        //disabled={!dirty || !isValid}
                      >
                        Send Message
                      </Button>
                    </Box>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
