import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Menu from './components/Menu.jsx';
import Main from './components/Main.jsx';
import Messages from './components/Messages.jsx';
import PostRide from './components/PostRide.jsx';
import Profile from './components/Profile.jsx';
import SignUp from './components/SignUp.jsx';
//import Login from './components/Login.jsx'

function App() {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/" exact element={<Main />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/my-profile" element={<Profile />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/post-ride" element={<PostRide />} />

      </Routes>
    </Router>
  );
}

ReactDom.render(<App />, document.getElementById('app'));
