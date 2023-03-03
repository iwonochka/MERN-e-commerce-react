import { useEffect, useContext, useState } from "react";
import { AuthContext } from '../../context/auth.context';
import { Link } from "react-router-dom";
import {AiFillDelete} from "react-icons/ai"
import Container from "react-bootstrap/Container";


const Favs = ({favs, deleteFav, getFavs}) => {
  const {user} = useContext(AuthContext)
  const [hoveredOn, setHoveredOn] = useState("")



  return (
    <div className="main-container">
    <section className="secondary-header">
      <h3>Favourites</h3>
    </section>
      <Container className="grid-wrapper">
        {!favs.length && <p>Add some products to your favorites!</p>}
        {favs?.map((fav) => {
          return (
            <div
              className="product-card"
              key={fav._id}
              onMouseEnter={() => {
                setHoveredOn(fav._id);
              }}
              onMouseLeave={() => {
                setHoveredOn("");
              }}
            >
              <Link to={`/bikes/${fav._id}`}>
                <img
                  id="product-card-img"
                  src={fav.images[0]}
                  alt={fav.model}
                />
              </Link>
              <div className="product-card-details fading-border">
                <Link className="card-title" to={`/bikes/${fav._id}`}>
                  <section className={hoveredOn === fav._id && "card-title-dark"}>
                    <h5>{fav.model}</h5>
                  </section>
                </Link>
                <p id="card-price">{fav.price} €</p>
              </div>
              {hoveredOn === fav._id && (
                    <div className="card-icons">
                      <AiFillDelete
                        onClick={() => {
                          deleteFav(fav);
                        }}
                        className="card-icon"
                      />
                    </div>
                  )}
            </div>
          );
        })}

      </Container>

    </div>
  )
}

export default Favs
