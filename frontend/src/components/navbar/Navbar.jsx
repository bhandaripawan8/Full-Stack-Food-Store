import React, { useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/frontend_assets/assets";

const Navbar = () => {
  const [menu, setMenu] = useState('Home');

  return (
    <div className="navbar">
      <img className="logo" src={assets.logo} alt="Logo" />
      <ul className="navbar-menu">
        <li onClick={() => setMenu('Home')} className={menu === 'Home' ? 'active' : ''}>Home</li>
        <li onClick={() => setMenu('Menu')} className={menu === 'Menu' ? 'active' : ''}>Menu</li>
        <li onClick={() => setMenu('Mobile-app')} className={menu === 'Mobile-app' ? 'active' : ''}>Mobile-app</li>
        <li onClick={() => setMenu('Contact us')} className={menu === 'Contact us' ? 'active' : ''}>Contact us</li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search Icon" />
        <div className="navbar-search-icon">
          <img src={assets.basket_icon} alt="Basket Icon" />
          <div className="dot"></div>
        </div>
        <button>Sign in</button>
      </div>
    </div>
  );
};

export default Navbar;
