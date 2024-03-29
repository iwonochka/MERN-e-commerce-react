import ebike from "../../assets/ebike.jpg";
import cruiser from "../../assets/cruiser.jpg";
import urban from "../../assets/urban.jpg";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = (props) => {
  return (
    <>
      <section className="homepage-preview row">
        <div className="homepage-preview-section col-sm-12 col-md-4 col-lg-4 ">
          <img className="preview-img img-fluid" src={ebike} alt="ebike" />
          <Link
            className="btn btn-lg btn-dark btn-main btn-homepage"
            to="/ebikes"
            onClick={() => {
              props.setFilterFor("/ebikes");
            }}
          >
            E-bikes
          </Link>
        </div>
        <div className="homepage-preview-section col-sm-12 col-md-4 col-lg-4">
          <img className="preview-img img-fluid" src={cruiser} alt="hybrids" />
          <Link
            className="btn btn-lg btn-dark btn-main btn-homepage"
            to="/hybrids"
            onClick={() => {
              props.setFilterFor("/hybrids");
            }}
          >
            Hybrids
          </Link>
        </div>
        <div className="homepage-preview-section col-sm-12 col-md-4 col-lg-4">
          <img className="preview-img img-fluid" src={urban} alt="urban" />
          <Link
            className="btn btn-lg btn-dark btn-main btn-homepage"
            to="/urban"
            onClick={() => {
              props.setFilterFor("/urban");
            }}
          >
            Urban
          </Link>
        </div>
      </section>
    </>
  );
};

export default HomePage;
