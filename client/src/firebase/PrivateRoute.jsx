import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthContext } from '../contexts/index.jsx';

function PrivateRoute({ children }) {
  const { currentUser } = useContext(AuthContext);

  return currentUser ? children : <Navigate to="/login" />;
}

PrivateRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PrivateRoute;
