import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/Home.css';
import { FaHome, FaSearch, FaPlusSquare, FaHeart, FaUserAlt } from 'react-icons/fa';

function Navbar() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    document.body.classList.toggle('light-mode', !darkMode);
  }, [darkMode]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
        <Link to="/" className="nav-link">
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
    alt="Instagram"
    className="logo-img"
    style={{ width: '45px', height: '45px' }}
  />
</Link>


        </div>

        <ul className="nav-icons">
          <li><Link to="/" className="nav-link"><FaHome /></Link></li>
          <li><Link to="/search" className="nav-link"><FaSearch /></Link></li>
          <li><Link to="/upload" className="nav-link"><FaPlusSquare /></Link></li>
          <li><Link to="/notifications" className="nav-link"><FaHeart /></Link></li>
          <li><Link to="/profile" className="nav-link"><FaUserAlt /></Link></li>
        </ul>

        <div className="nav-right">
          <label className="theme-switch">
            <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
            <span className="slider" />
          </label>
          <Link to="/login" onClick={handleLogout} className="nav-link">Cerrar sesión</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
