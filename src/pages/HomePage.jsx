import ebike from '../assets/ebike.jpg';
import cruiser from '../assets/cruiser.jpg';
import urban from '../assets/urban.jpg';
import { Link } from "react-router-dom";
import './HomePage.css'

const HomePage = () => {
  return (
    <main>
      <div className="homepage-preview row">
        <img className="col-sm-12 col-md-4 col-lg-4 img-fluid preview-img" src={ebike} alt="ebike" />
        <img className="col-sm-12 col-md-4 col-lg-4 img-fluid preview-img" src={cruiser} alt="cruiser" />
        <img className="col-sm-12 col-md-4 col-lg-4 img-fluid preview-img" src={urban} alt="urban" />
      </div>
    </main>
  )
}

export default HomePage
