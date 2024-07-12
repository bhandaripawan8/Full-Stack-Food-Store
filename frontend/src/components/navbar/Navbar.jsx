<<<<<<< HEAD
import React, { useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/frontend_assets/assets";
=======
import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/frontend_assets/assets'
>>>>>>> 97c74c4c0a72c52928fd9f3fe3745da1b43f2c3e

const Navbar = () => {
  const [menu, setMenu] = useState('Home');


  return (
<<<<<<< HEAD
    <div className="navbar">
      <img className="logo" src={assets.logo} />
      <ul className="navbar-menu">
        <li onClick={()=>setMenu('Home')} className={menu === 'Home' ? 'active': ''}>Home</li>
        <li onClick={()=>setMenu('Menu')} className={menu === 'Menu'?'active': ''}>Menu</li>
        <li onClick={()=>setMenu('Mobile-app')} className={menu === 'Mobile-app'?'active': ''}>Mobile-app</li>
        <li onClick={()=>setMenu('Contact us')} className={menu === 'Contact us'?'active': ''}>Contact us</li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <img src={assets.basket_icon} alt="" />
          <div className="dot">
          </div>
        </div>
            <button>Sign in</button>
      </div>
=======
    <div className='navbar'>
      <img src={assets.logo} alt="" />
>>>>>>> 97c74c4c0a72c52928fd9f3fe3745da1b43f2c3e
    </div>
  );
};

export default Navbar;
