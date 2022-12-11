import ebike from '../../assets/ebike.jpg';
import cruiser from '../../assets/cruiser.jpg';
import urban from '../../assets/urban.jpg';
import { Link } from "react-router-dom";
import './HomePage.css'

const HomePage = () => {

  return (
    <main>
      <section className="homepage-preview row">
        <div className="homepage-preview-section col-sm-12 col-md-4 col-lg-4 ">
          <img className="preview-img img-fluid" src={ebike} alt="ebike" />
          <Link to="/" className='btn btn-lg btn-dark btn-main btn-homepage'>E-bikes</Link>
        </div>
        <div className="homepage-preview-section col-sm-12 col-md-4 col-lg-4">
          <img className="preview-img img-fluid" src={cruiser} alt="cruiser" />
          <Link to="/" className='btn btn-lg btn-dark btn-main btn-homepage'>Hybrids</Link>
        </div>
        <div className="homepage-preview-section col-sm-12 col-md-4 col-lg-4">
          <img className="preview-img img-fluid" src={urban} alt="urban" />
          <Link to="/" className='btn btn-lg btn-dark btn-main btn-homepage'>Urban</Link>
        </div>
      </section>

    </main>
  )
}

export default HomePage
