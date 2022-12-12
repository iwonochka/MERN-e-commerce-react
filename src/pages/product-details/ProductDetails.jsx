import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CarouselDetails from '../../components/carousel/CarouselDetails'
import "./ProductDetails.css"
import {BsPlugFill} from "react-icons/bs"
import {AiFillQuestionCircle} from "react-icons/ai"
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import { BsFillHeartFill } from "react-icons/bs";
import { BsBag } from "react-icons/bs";
import { BsCheck } from "react-icons/bs";



const ProductDetails = (props) => {

  const [product, setProduct] = useState(null);
  const { productId } = useParams();
  // console.log(productId)
  const [show, setShow] = useState(false);
  const [colorChoice, setColorChoice] = useState("")
  const [sizeChoice, setSizeChoice] = useState("")

  const target = useRef(null);
  const navigate = useNavigate();

  const getProduct = () => {

    axios.get(`${process.env.REACT_APP_API_URL}/api/products/${productId}`)
    .then((response) => {
      const oneProduct = response.data;
      setProduct(oneProduct);
    })
    .catch((error) => console.log(error));
  };
  useEffect(()=> {
    getProduct();
  }, [] );

  function addCartItem() {
    const newItem = {
      product: product,
      sizeChoice: sizeChoice,
      colorChoice: colorChoice
    }
    props.setCartItems([...props.cartItems, newItem])
    console.log("cartItems:" , props.cartItems, "newItem:", newItem)
    //  how to pass props??
  }

  return (
  <div>
    {product ? (
      <Row className="product-details-container">
        <Col className="carousel-details" sm={12} md={6} lg={6}>
          <CarouselDetails product={product}></CarouselDetails>
        </Col>
        <Col sm={12} md={6} lg={6}>

          <div className="product-description-header">
            <h2>{product.model}</h2>
            <h2>{product.price} €</h2>
          </div>
          <div className="product-description-1">
            {product.isAvailable ? <p className="av-tag" style={{backgroundColor: "#134d37", color: "white"}}>Available</p> : <p className="av-tag" style={{color: "#660001"}}>Currently unavailable</p>}
            {product.isEbike && <p><BsPlugFill size={20}/> eBike</p>}
          </div>
          <div className="product-description-container">
            <div className="product-description-2">
              <p>Producer: {product.brand}</p>
              <p>Gears: {product.gears}</p>
              <p><b>Choose a size:</b><AiFillQuestionCircle style={{marginLeft: "6", marginBottom: "5"}} ref={target} onMouseEnter={() => setShow(show)} onMouseLeave={() => setShow(!show)}/></p>

              <Overlay target={target.current} show={show} placement="right">
                {(props) => (
                  <Tooltip id="overlay-example" {...props}>
                    My Tooltip
                  </Tooltip>
                )}
              </Overlay>
              <div className="options-container">
                {product.sizes.map((size) => (
                  <Button variant={sizeChoice === size ? "dark" : "outline-dark"} onClick={()=> {setSizeChoice(size)}}>{size}</Button>
                ))}
              </div>
              <p><b>Choose a color:</b></p>
              <div className="options-container">
                {product.colors.map((oneColor) => (
                  <div className="color-choice" style={{backgroundColor: oneColor}} onClick={()=> {setColorChoice(oneColor)}}>
                    {colorChoice === oneColor && <BsCheck style={oneColor === "white" ? {color: "black"} : {color: "white"}}/>}
                  </div>
                ))}
              </div>
            </div>
            <div className="actions-container">
              <Button className="btn-main" id="fav-btn" variant="dark"><BsFillHeartFill/></Button>
              <Button className="btn-main" id="action-btn" variant="dark">Add to cart<BsBag style={{marginLeft: "6", marginBottom: "5"}} onClick={addCartItem}/></Button>
            </div>
          </div>
        </Col>
      </Row>
    ) : <p>loading</p>}
  </div>
  )
}

export default ProductDetails
