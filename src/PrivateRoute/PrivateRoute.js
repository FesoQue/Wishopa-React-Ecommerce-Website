import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAppContext } from '../Context/context';

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAppContext();
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to='/signin' />
        );
      }}
    ></Route>
  );
}
