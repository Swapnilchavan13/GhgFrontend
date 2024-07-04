import React from 'react';
import '../styles/homenavbar.css';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/homepage');
      };
  return (
    <div id='Mainnavbar'>
        <div className='btndiv'>
            <a href="/client">
            <button>Client Login</button>
            </a>
            <a href="/user/login">
            <button>User Login</button>
            </a>
        </div>
    <div className='navdiv2'>
       
    <img
      id="logoimg"
      src="https://csabooster.climate-kic.org/wp-content/uploads/2016/11/Climate_KIC_horizontal_logo_JPEG-for-print.jpg"
      alt="Climate KIC Logo"
      style={{ cursor: 'pointer' }} // Optional: change cursor to pointer
      onClick={handleClick}
    />
      
    <div className='navdiv3'>
        <h2>About CS</h2>
        <h2>N.E.X.T.</h2>
        <h2>Marketplace</h2>
        <h2>Resources</h2>
        <h2>Calculate</h2>
    </div>
    </div>
    </div>
  )
}
