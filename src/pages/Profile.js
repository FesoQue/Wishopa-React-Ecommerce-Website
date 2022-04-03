import React, { useState } from 'react';
import { useAppContext } from '../Context/context';
import { Box, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { FaRegCalendarAlt } from 'react-icons/fa';
import Moment from 'react-moment';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  white: {
    backgroundColor: 'white',
    color: '#5b5fdf',
  },
}));

const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const Profile = () => {
  const classes = useStyles();
  const {
    currentUser,
    updateUserDisplayName,
    updateUserEmail,
    updateUserPassword,
  } = useAppContext();

  const [name, setName] = useState(currentUser?.displayName);
  const [email, setEmail] = useState(currentUser?.email);
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [error, setError] = useState(false);
  const [nameErrProps, setNameErrProps] = useState({
    bool: false,
    msg: '',
  });
  const [emailErrProps, setEmailErrProps] = useState({
    bool: false,
    msg: '',
  });
  const [passwordErrProps, setPasswordErrProps] = useState({
    bool: false,
    msg: '',
  });
  const [confirmErrProps, setConfirmErrProps] = useState({
    bool: false,
    msg: '',
  });
  const [isDisabled, setIsDisabled] = useState(false);

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    if (!name) {
      setNameErrProps({
        ...nameErrProps,
        bool: true,
        msg: 'name cannot be blank',
      });
    } else if (name.length < 3) {
      setNameErrProps({
        ...nameErrProps,
        bool: true,
        msg: 'name is too short',
      });
    } else {
      toast.promise(updateUserDisplayName(name), {
        success: (data) => 'name successfully updated',
        error: (err) => `This just happened: ${err.toString()}`,
      });
      setNameErrProps({ ...nameErrProps, bool: false, msg: '' });
    }

    if (!email) {
      setEmailErrProps({
        ...emailErrProps,
        bool: true,
        msg: 'email cannot be empty',
      });
    } else if (!validateEmail(email)) {
      setEmailErrProps({
        ...emailErrProps,
        bool: true,
        msg: 'enter valid email',
      });
    } else {
      toast.promise(updateUserEmail(email), {
        success: (data) => 'email successfully updated',
        error: (err) => `This just happened: ${err.toString()}`,
      });
      // updateUserEmail(email);
      // console.log(email);
      // setEmailErrProps({ ...emailErrProps, bool: false, msg: '' });
    }

    if (password) {
      if (password.length < 6) {
        setPasswordErrProps({
          ...passwordErrProps,
          bool: true,
          msg: 'password be atleast 6 characters long',
        });
      }
    } else {
      setPasswordErrProps({
        ...passwordErrProps,
        bool: false,
        msg: '',
      });
    }
    // if (password !== '') {
    //   setPasswordErrProps({
    //     ...passwordErrProps,
    //     bool: true,
    //     msg: 'password be atleast 6 characters long',
    //   });
    // } else {
    //   setPasswordErrProps({
    //     ...passwordErrProps,
    //     bool: false,
    //     msg: '',
    //   });
    // }

    if (password && !confirmPw) {
      setConfirmErrProps({
        ...confirmErrProps,
        bool: true,
        msg: 'confirm your password',
      });
    } else if (confirmPw !== password) {
      setConfirmErrProps({
        ...confirmErrProps,
        bool: true,
        msg: 'password does not match',
      });
    } else if (!password && password.length < 6) {
      setConfirmErrProps({
        ...confirmErrProps,
        bool: false,
        msg: '',
      });
    }

    if (
      password &&
      password.length > 5 &&
      confirmPw &&
      confirmPw === password
    ) {
      toast.promise(updateUserPassword(password), {
        success: (data) => 'password successfully updated',
        error: (err) => `This just happened: ${err.toString()}`,
      });
    }
  };

  // useEffect(() => {
  //   if (!name || !email || (email && !validateEmail(email))) {
  //     setIsDisabled(true);
  //   } else {
  //     setIsDisabled(false);
  //   }
  // }, [name, email]);
  console.log(currentUser);

  return (
    <div className='profile-section'>
      <div className='profile-col-1'>
        <div className='profile-header'>
          <div className='profile-img-wrapper'>
            <Avatar
              className={classes.white}
              id='profile-img'
              src={currentUser.photoURL && currentUser.photoURL}
            />
          </div>
          <p className='display-name'>
            @{currentUser?.displayName && currentUser?.displayName}
          </p>
          <div className='created-at'>
            <span>
              <FaRegCalendarAlt />
            </span>
            <p>
              Joined{' '}
              <Moment
                date={currentUser?.metadata.creationTime}
                format='DD MMM Y'
              />{' '}
            </p>
          </div>
        </div>
      </div>
      <div className='profile-col-2'>
        <form
          action=''
          noValidate
          autoComplete='off'
          onSubmit={handleUpdateProfile}
        >
          <Box className='profile-form-card container'>
            <h2>Profile Settings</h2>
            <TextField
              error={nameErrProps.bool}
              label='username'
              value={name}
              onChange={(e) => setName(e.target.value)}
              helperText={nameErrProps.msg}
              variant='outlined'
              fullWidth
            />
            <TextField
              error={emailErrProps.bool}
              label='email address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              helperText={emailErrProps.msg}
              variant='outlined'
              fullWidth
            />
            <TextField
              error={password && password.length < 6 && true}
              label='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              helperText={
                password &&
                password.length < 6 &&
                'password should be atleast 6 characters long'
              }
              variant='outlined'
              fullWidth
            />
            <TextField
              error={confirmErrProps.bool}
              label='confirm password'
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              type='password'
              helperText={confirmErrProps.msg}
              variant='outlined'
              fullWidth
            />
            <Button
              variant='contained'
              type='submit'
              fullWidth
              id='checkout-btn'
              disabled={isDisabled}
            >
              Update Profile
            </Button>
          </Box>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default Profile;
