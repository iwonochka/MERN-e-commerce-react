import { NavLink } from "react-router-dom";
import './Navbar.css'
import { BsSearch } from "react-icons/bs";
import { BsFillHeartFill } from "react-icons/bs";
import { BsBag } from "react-icons/bs";
import logo from '../assets/vellox.png'

const Navbar = () => {
  return (
    <nav>
      <div className="nav-left">
        <img id="nav-logo" src={logo} alt="logo" />
        <NavLink to="/" className={({ isActive }) => isActive ? 'activeNavLink' : 'navLink'}>Home</NavLink>
        <NavLink to="/bikes" className={({ isActive }) => isActive ? 'activeNavLink' : 'navLink'}>All bikes</NavLink>
        <NavLink to="#" className={({ isActive }) => isActive ? 'activeNavLink' : 'navLink'}> Link 3</NavLink>
      </div>
      <div className="navicons">
        <BsSearch/>
        <BsFillHeartFill/>
        <NavLink to="/cart" className={({ isActive }) => isActive ? 'activeNavLink' : 'navLink'}><BsBag/></NavLink>
      </div>
    </nav>
  )
}

export default Navbar
