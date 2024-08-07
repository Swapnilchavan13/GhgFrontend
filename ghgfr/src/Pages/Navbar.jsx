import React from 'react';
import '../styles/homenavbar.css';
import { Link, useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/homepage');
      };

      const handleClick2 = () => {
        navigate('https://nettzero.world/');
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
      src="/clilogo.jpeg"
      alt="Climate KIC Logo"
      style={{ cursor: 'pointer' }} // Optional: change cursor to pointer
      onClick={handleClick}
      />
<div style={{display:'flex', gap:"5px", width: "100%", height:"60px", marginLeft:"10px"}}>

   
      <h4>From </h4>
      <img style={{borderRadius:"10px"}} src="https://nettzero.world/wp-content/uploads/2024/02/cropped-ce2055_a34cf15bcb3c4c4b9851a279e2de0f4cmv2.webp" alt="" />
 
      </div>
      
    <div className='navdiv3'>
      <Link to={'about'}>
        <h4>About</h4>
      </Link>
      <Link to={'contact'}>
        <h4>Contact</h4>
      </Link>
      <Link to={'marketplace'}>
        <h4>Marketplace</h4>
      </Link>
    </div>
    </div>
    </div>
  )
}
