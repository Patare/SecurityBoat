import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; 
function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
      <li>
          <Link to="/dashbord">Dashbord</Link>
        </li>
        <li>
          <Link to="/foods">Add Foods</Link>
        </li>
        <li>
          <Link to="/movie">Add Movies</Link>
        </li>
        <li>
          <Link >Orders</Link>
        </li>
        <li>
          <Link to="/login">Logout</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
