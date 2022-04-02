import React from 'react';
import { useAppContext } from '../Context/context';
import { Box, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

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
            hello world
          </div>
        </div>
      </div>
      <div className='profile-col-2'>
        <form action='' noValidate autoComplete='off'>
          <Box className='profile-form-card container'>
            <TextField
              //   error
              label='username'
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
          </Box>
        </form>
      </div>
    </div>
  );
};

export default Profile;
