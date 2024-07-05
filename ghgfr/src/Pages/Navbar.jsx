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
      src="clilogo.jpeg"
      alt="Climate KIC Logo"
      style={{ cursor: 'pointer' }} // Optional: change cursor to pointer
      onClick={handleClick}
    />
      
    <div className='navdiv3'>
        <h4>About CS</h4>
        <h4>N.E.X.T.</h4>
        <h4>Marketplace</h4>
        <h4>Resources</h4>
        <h4>Calculate</h4>
    </div>
    </div>
    </div>
  )
}
