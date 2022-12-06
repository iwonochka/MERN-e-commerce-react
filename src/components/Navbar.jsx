import React from 'react'
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <NavLink to="#" className={({ isActive }) => isActive ? 'activeNavLink' : 'navLink'}></NavLink>
      <NavLink to="#" className={({ isActive }) => isActive ? 'activeNavLink' : 'navLink'}></NavLink>
      <NavLink to="#" className={({ isActive }) => isActive ? 'activeNavLink' : 'navLink'}></NavLink>
    </nav>
  )
}

export default Navbar
