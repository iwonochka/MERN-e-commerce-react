import { useState, useEffect } from "react";
import axios from "axios";
import './Products.css';
import { BsFillHeartFill } from "react-icons/bs";
import { BsBagPlusFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Searchbar from "../../components/searchbar/Searchbar";
import Dropdown from 'react-bootstrap/Dropdown';


const Products = () => {
  const [products, setProducts] = useState([]);
  const [hoveredOn, setHoveredOn] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [query, setQuery] = useState("")

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

  const filteredProducts = products.filter(product => {
    return product.model.toLowerCase().includes(query.toLowerCase());
  });


  function sortByPriceAsc() {
    setProducts([...products].sort((a, b) => {return a.price - b.price}))
  }

  function sortByPriceDesc() {
    setProducts([...products].sort((a, b) => {return b.price - a.price}))
  }

  function sortByDefault() {
    getAllProducts()
  }

  return (
    <div className="Products">
      <section className="products-header">
        <h3>{query ? `Results for: ${query}` : "All bikes"}</h3>
      </section>
      <section className="search-section">
        <Searchbar setQuery={setQuery}/>
        <Link className="btn btn-outline-dark search-btn">Filter</Link>
        <Dropdown>
          <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
            Sort
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={sortByPriceAsc}>Price: lowest</Dropdown.Item>
            <Dropdown.Item onClick={sortByPriceDesc}>Price: highest</Dropdown.Item>
            <Dropdown.Item onClick={sortByDefault}>Default</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </section>
      <section className="products-grid">
        {filteredProducts.map((product) => {
          return (
            <div className="product-card" key={product._id} onMouseEnter={()=> {setHoveredOn(product._id)}} onMouseLeave={()=> {setHoveredOn("")}}>
              <img id="product-card-img" src={product.image} alt={product.model} />
              <div>
                <h5 className={hoveredOn === product._id && "card-title-dark"}>{product.model}</h5>
                <p id="card-price">{product.price} €</p>
              </div>
              {hoveredOn === product._id &&
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
