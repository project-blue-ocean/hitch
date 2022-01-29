import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <h3>Logo</h3>
      <u1 className="nav-links">
      <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/my-profile">
          <li>Profile</li>
        </Link>
        <Link to="/messages">
          <li>Messages</li>
        </Link>
        <Link to="/search-rides">
          <li>Search rides</li>
        </Link>
        <Link to="/post-ride">
          <li>Post a ride</li>
        </Link>
        <Link to="/pending-requests">
          <li>Pending requests</li>
        </Link>
        <Link to="/login">
          <li>Logout</li>
        </Link>
      </u1>
    </nav>
  );
}

export default Navbar;
