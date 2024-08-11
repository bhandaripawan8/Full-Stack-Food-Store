import React from 'react'
import './Nabbar.css'
import {assets} from '../../../assets/admin_assets/assets'

const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={assets.logo} className='logo' alt="" />
        <img src={assets.profile_image} className='profile' alt="" />
    </div>

  )
}

export default Navbar