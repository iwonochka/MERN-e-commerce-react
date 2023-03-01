import "./Footer.css"
import Logo from "../../assets/logo-small.png";
import { Link } from "react-router-dom";
import {BsGithub, BsLinkedin} from "react-icons/bs";


const Footer = () => {
  return (

    <footer className="footer">
      <section id="footer-first-section">
        <img src={Logo} style={{width: "60px", height: "60px", marginBottom: "1rem"}}  alt="logo" />
        <p>© Iwona Behnke 2022</p>
        <p>Product pictures and some of the data used to create shop products come from <a className="external-link" href="https://99spokes.com/" target="_blank" rel="noreferrer">99spokes API</a></p>
      </section>
      <section className="footer-links vertical-line">
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/ebikes">E-bikes</Link>
        <Link to="/hybrids">Hybrids</Link>
        <Link to="/urban">Urban</Link>
      </section>
      <section>
        <h5>Get in contact</h5>
        <div className="external-links">
        <a className="external-link" href="https://github.com/iwonochka" target="_blank" rel="noreferrer"><BsGithub/></a>
        <a className="external-link" href="www.linkedin.com/in/behnke-iwona" target="_blank" rel="noreferrer"><BsLinkedin/></a>
        </div>
      </section>
    </footer>

  )
}

export default Footer
