import { useState, useEffect } from "react";
import axios from "axios";
import './Products.css';
import { BsFillHeartFill } from "react-icons/bs";
import { BsBagPlusFill } from "react-icons/bs";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [hoveredOn, setHoveredOn] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const getAllProducts = () => {

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/products`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllProducts();
  }, [] );

  function handleClick() {
    setIsClicked(!isClicked)
  }

  return (
    <div className="Products">
      <section className="products-header">
        <h1>Title</h1>
      </section>
      <section className="products-grid">
        {products.map((product) => {
          return (
            <div className="product-card" key={product._id} onMouseEnter={setHoveredOn(true)} onMouseLeave={setHoveredOn(false)}>
              <img id="product-card-img" src={product.image} alt={product.model} />
              <div>
                <h5 className={hoveredOn && "card-title-dark"}>{product.model}</h5>
                <p id="card-price">{product.price} €</p>
              </div>
              {hoveredOn &&
                <div>
                  <BsFillHeartFill onClick={handleClick} style={{color: isClicked ? 'red' : 'black'}}/>
                  <BsBagPlusFill/>
                </div>
              }
            </div>
          );
        })}
      </section>
    </div>
  )
}

export default Products
