import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar.jsx';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/search-rides" element={<SearchRides />} />
        <Route path="/post-ride" element={<PostRide />} />
        <Route path="/pending-requests" element={<PendingRequests />} />
      </Routes>
    </Router>
  );
}


// TODO:
// Move these placeholder components
// into components folder and start
// building them out.

function Home() {
  return (
    <div>
      This is the Home view.
    </div>
  );
}

function Login() {
  return (
    <div>
      This is the Login view.
    </div>
  );
}

function Signup() {
  return (
    <div>
      This is the Signup view.
    </div>
  );
}

function MyProfile() {
  return (
    <div>
      This is the MyProfile view.
    </div>
  );
}

function Messages() {
  return (
    <div>
      This is the Messages view.
    </div>
  );
}

function SearchRides() {
  return (
    <div>
      This is the SearchRides view.
    </div>
  );
}

function PostRide() {
  return (
    <div>
      This is the PostRide view
    </div>
  );
}

function PendingRequests() {
  return (
    <div>
      This is the PendingRequests view.
    </div>
  );
}

ReactDom.render(<App />, document.getElementById('app'));
