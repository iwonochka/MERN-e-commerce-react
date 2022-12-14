import { useState, useEffect, useRef } from "react";
import axios from "axios";
import './Products.css';
import { BsFillHeartFill } from "react-icons/bs";
import { BsBagPlusFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Searchbar from "../../components/searchbar/Searchbar";
import SortDropdown from "../../components/sortDropdown/SortDropdown";
import Button from 'react-bootstrap/Button';
import FilterModal from "../../components/filterModal/FilterModal";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



const Products = () => {
  const [products, setProducts] = useState([]);
  const [hoveredOn, setHoveredOn] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [query, setQuery] = useState("")
  const [modalShow, setModalShow] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);

  const getAllProducts = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/products`)
      .then((response) => {
        setProducts(response.data)
        setFilteredProducts(response.data)
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    count.current = count.current + 2
    getAllProducts();
  }, [] );

  function handleClick() {
    setIsClicked(!isClicked)
  }

  const searchedProducts = filteredProducts.filter(product => {
    return product.model.toLowerCase().includes(query.toLowerCase());
  });

  const count = useRef(2)
  console.log(count)

  return (
    <div className="Products">
      <section className="products-header">
        <h3>{query ? `Results for: ${query}` : "All bikes"}</h3>
      </section>
      <section className="search-section">
        <Searchbar setQuery={setQuery}/>
        <Button variant="outline-dark" onClick={() => setModalShow(true)}>Filter</Button>
        <FilterModal show={modalShow} onHide={() => setModalShow(false)} setModalShow={setModalShow} products={products} filteredProducts={filteredProducts} setFilteredProducts={setFilteredProducts}/>
        <SortDropdown products={products} setProducts={setProducts} getAllProducts={getAllProducts} />
      </section>

      <Container>
        <Row>
        {searchedProducts?.map((product) => {
          return (
            <Col sm={12} md={4} lg={4} className="product-card" key={product._id} onMouseEnter={()=> {setHoveredOn(product._id)}} onMouseLeave={()=> {setHoveredOn("")}}>
              <Link to={`/bikes/${product._id}`} >
                <img id="product-card-img" src={product.images[0]} alt={product.model} />
              </Link>
              <div className="product-card-details fading-border">
              <Link className="card-title" to={`/bikes/${product._id}`} ><section className={hoveredOn === product._id && "card-title-dark"}><h5>{product.model}</h5></section></Link>
                <p id="card-price">{product.price} €</p>
              </div>
              {hoveredOn === product._id &&
                <div className="card-icons">
                  <BsFillHeartFill onClick={handleClick} style={{color: isClicked ? 'red' : 'white'}}/>
                  <BsBagPlusFill/>
                </div>
              }
            </Col>
          );
        })}
        </Row>
      </Container>
{/*
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
      </section> */}
    </div>
  )
}

export default Products
