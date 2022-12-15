import { useState, useEffect } from "react";
import axios from "axios";
import "./Products.css";
import { BsFillHeartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Searchbar from "../../components/searchbar/Searchbar";
import SortDropdown from "../../components/sortDropdown/SortDropdown";
import Button from "react-bootstrap/Button";
import FilterModal from "../../components/filterModal/FilterModal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../product-details/ProductDetails.css";
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../context/auth.context';

const Products = (props) => {
  const [hoveredOn, setHoveredOn] = useState("");
  // const [isFav, setIsFav] = useState(false);
  const [query, setQuery] = useState("");
  const [modalShow, setModalShow] = useState(false);



  const searchedProducts = props.filteredProducts.filter((product) => {
    return product.model.toLowerCase().includes(query.toLowerCase());
  });



  return (
    <div className="Products">
      <section className="secondary-header">
        <h3>{query ? `Results for: ${query}` : "All bikes"}</h3>
      </section>
      <section className="search-section">
        <Searchbar setQuery={setQuery} />
        <Button variant="outline-dark" onClick={() => setModalShow(true)}>
          Filter
        </Button>
        <FilterModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          setModalShow={setModalShow}
          products={props.products}
          filteredProducts={props.filteredProducts}
          setFilteredProducts={props.setFilteredProducts}
        />
        <SortDropdown
          products={props.products}
          setProducts={props.setProducts}
          getAllProducts={props.getAllProducts}
        />
      </section>

      <Container>
        <Row>
          {searchedProducts?.map((product) => {
            return (
              <Col
                sm={12}
                md={4}
                lg={4}
                className="product-card"
                key={product._id}
                onMouseEnter={() => {
                  setHoveredOn(product._id);
                }}
                onMouseLeave={() => {
                  setHoveredOn("");
                }}
              >
                <Link to={`/bikes/${product._id}`}>
                  <img
                    id="product-card-img"
                    src={product.images[0]}
                    alt={product.model}
                  />
                </Link>
                <div className="product-card-details fading-border">
                  <Link className="card-title" to={`/bikes/${product._id}`}>
                    <section
                      className={hoveredOn === product._id && "card-title-dark"}
                    >
                      <h5>{product.model}</h5>
                    </section>
                  </Link>
                  <p id="card-price">{product.price} €</p>
                </div>
                {hoveredOn === product._id && (
                  <div className="card-icons">
                    <Button
                      className="btn-main fav-btn"
                      id="fav-products"
                      variant="outline-light"
                      onClick={() => {
                        props.handleFavs(product);
                      }}
                    >
                      <BsFillHeartFill
                        className={props.isFav(product) ? "fav-color" : ""}
                      />
                    </Button>
                  </div>
                )}
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default Products;
