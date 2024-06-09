import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {/* <li className="navbar-item"><Link to="/">Register</Link></li> */}
        <li className="navbar-item"><Link to="/login">Logout</Link></li>
        <li className="navbar-item"><Link to="/movieList">Movie List</Link></li>
        <li className="navbar-item"><Link to="/foodItem">Foods</Link></li>
        {/* <li className="navbar-item"><Link to="/movie">Movie Management</Link></li> */}
      </ul>
    </nav>
  );
};

export default Navbar;
