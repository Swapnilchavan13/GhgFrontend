import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/navbar.css"

export const Adminnavbar = () => {
  return (
    <div className="navbar-container">
      <Link to='/addemission' className="nav-link">
        <h3>Add Emission</h3>
      </Link>
      <Link to='/addclient' className="nav-link">
        <h3>Add Clients</h3>
      </Link>      
      <Link to='/allclients' className="nav-link">
        <h3>All Clients</h3>
      </Link>
      <Link to='/allemissions' className="nav-link">
        <h3>All Emissions</h3>
      </Link>
    </div>

  )
}
