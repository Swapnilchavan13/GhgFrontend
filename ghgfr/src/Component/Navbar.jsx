import React from 'react'
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
     <div>
    <Link to='upload'>
        <h3>Upload Data</h3>
    </Link>
    <Link to='see'>
        <h3>All Data</h3>
    </Link>
    <Link to='select'>
        <h3>Select Data</h3>
    </Link>
</div>
  )
}
