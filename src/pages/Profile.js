import React from 'react';
import { useAppContext } from '../Context/context';
import { Box, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { FaRegCalendarAlt } from 'react-icons/fa';
import Moment from 'react-moment';

const useStyles = makeStyles((theme) => ({
  white: {
    backgroundColor: 'white',
    color: '#5b5fdf',
  },
}));

const Profile = () => {
  const classes = useStyles();
  const { currentUser } = useAppContext();

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
        <form action='' noValidate autoComplete='off'>
          <Box className='profile-form-card container'>
            <h2>Profile Settings</h2>
            <TextField
              //   error
              label='username'
              defaultValue={currentUser?.displayName}
              id='outlined-error-helper-text'
              //   helperText='Incorrect entry.'
              variant='outlined'
              fullWidth
            />
            <TextField
              //   error
              label='email address'
              defaultValue={currentUser?.email}
              id='outlined-error-helper-text'
              //   helperText='Incorrect entry.'
              variant='outlined'
              fullWidth
            />
            <TextField
              //   error
              label='password'
              id='outlined-error-helper-text'
              //   helperText='Incorrect entry.'
              variant='outlined'
              fullWidth
            />
            <TextField
              //   error
              label='confirm password'
              id='outlined-error-helper-text'
              //   helperText='Incorrect entry.'
              variant='outlined'
              fullWidth
            />
            <Button
              variant='contained'
              type='submit'
              fullWidth
              id='checkout-btn'
            >
              Update Profile
            </Button>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default Profile;
