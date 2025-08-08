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

   
      <h5>From </h5>
      <img style={{borderRadius:"10px"}} src="https://nettzero.world/wp-content/uploads/2024/02/cropped-ce2055_a34cf15bcb3c4c4b9851a279e2de0f4cmv2.webp" alt="" />
 
      </div>
      
    <div className='navdiv3'>
  <Link to={'/'}><h5>Home</h5></Link>
  <Link to={'/about'}><h5>About Us</h5></Link>
  <Link to={'/ecomemissions'}><h5>Emissions Measurement</h5></Link>
  <Link to={'/carbon-market'}><h5>Carbon Credit Marketplace</h5></Link>
  <Link to={'/sustainable-marketplace'}><h5>Sustainable Marketplace</h5></Link>
  <Link to={'/blog'}><h5>Blog / Resources</h5></Link>
  <Link to={'/login'}><h5>Login / Sign Up</h5></Link>
</div>

    </div>
    </div>
  )
}
