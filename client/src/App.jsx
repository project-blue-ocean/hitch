import React, { useState } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './firebase/PrivateRoute.jsx';

import './App.css';

import MenuOption from './components/MenuOption.jsx';
import Main from './components/Main.jsx';
import Messages from './components/Messages.jsx';
import PostRide from './components/PostRide.jsx';
import Profile from './components/Profile.jsx';
import SignUp from './components/SignUp.jsx';
import Login from './components/Login.jsx';
import Toast from './components/Toast.jsx';
import { AuthProvider } from './contexts/index.jsx';

function App() {
  return (
    <Router>
      <AuthProvider>
        <MenuOption />
        <Toast />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" exact element={<PrivateRoute><Main /></PrivateRoute>} />
          <Route path="/my-profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/messages" element={<PrivateRoute><Messages userId={84} /></PrivateRoute>} />
          <Route path="/post-ride" element={<PrivateRoute><PostRide /></PrivateRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

ReactDom.render(<App />, document.getElementById('app'));
