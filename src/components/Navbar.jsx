import { NavLink } from "react-router-dom";
import './Navbar.css'
import { BsFillHeartFill } from "react-icons/bs";
import { BsBag } from "react-icons/bs";
import { BiUserX } from "react-icons/bi";
import { FiUserCheck } from "react-icons/fi";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from "react-router-dom";

import logo from '../assets/vellox.png'

const Navbar = ({cartItems, favs}) => {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  return (
    <nav fixed="top">
      <div className="nav-left">
        <NavLink to="/"><img id="nav-logo" src={logo} alt="logo"/></NavLink>
        <div className="navlinks">
          <NavLink to="/" className={({ isActive }) => isActive ? 'activeNavLink' : 'navLink'}>Home</NavLink>
          <NavLink to="/bikes" className={({ isActive }) => isActive ? 'activeNavLink' : 'navLink'}>All bikes</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'activeNavLink' : 'navLink'}> About</NavLink>
        </div>
      </div>
      <div className="navicons">
      <NavLink to="/favs">
        <BsFillHeartFill/>
        {favs.length > 0 &&
          <div className="amount-indicator favs-indicator">
            <p>{favs.length}</p>
          </div>
          }
      </NavLink>
        <NavLink to="/cart" className={({ isActive }) => isActive ? 'activeNavLink' : 'navLink'} >
          <BsBag id="cart-icon" />
          {cartItems.length > 0 &&
          <div className="amount-indicator cart-indicator">
            <p>{cartItems.length}</p>
          </div>
          }
        </NavLink>

        {isLoggedIn ?
          <Dropdown>
          <Dropdown.Toggle variant="dark" id="dropdown-basic"><FiUserCheck style={{width: 20}}/></Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>
              <Link to="/myOrders">My Orders</Link>
            </Dropdown.Item>
            <Dropdown.Item href="/" onClick={logOutUser}><Link to="/">Log out</Link></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> :
        <NavLink to="/login" className={({ isActive }) => isActive ? 'activeNavLink' : 'navLink'}><BiUserX style={{width: 20}}/></NavLink>

        }
      </div>
    </nav>
  )
}

export default Navbar
