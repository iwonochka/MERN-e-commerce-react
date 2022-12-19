import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import Payment from "../payment/Payment";
import axios from "axios";
import {MdOutlineCancel} from "react-icons/md";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Cart.css"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {AiOutlineCheckCircle} from "react-icons/ai";
const REACT_APP_API_URL="http://localhost:5005"
const REACT_APP_API_URL2="https://vellox.cyclic.app"




const Cart = (props) => {
  // console.log("cart items:", props.cartItems)
  const [order, setOrder] = useState({})
  const [proceed, setProceed] = useState(false)
  const [checkoutData, setCheckoutData] = useState({
    name: null,
    surname: null,
    phone: null,
    address: null,
    city: null,
    zipCode: null,
  })

  function saveCartItems() {
    localStorage.setItem("cart-items", JSON.stringify(props.cartItems));
    // getting back the object
    props.setCartItems(JSON.parse(localStorage.getItem("cart-items")));
    // console.log("cart-items from storage:", JSON.parse(localStorage.getItem("cart-items")))
  }

  useEffect(() => {
      saveCartItems();
  }, []);

  const {user} = useContext(AuthContext)


  function deleteCartItem(cartItem) {
    const newCartItems = props.cartItems.filter((item) => item !== cartItem )
    props.setCartItems(newCartItems)
    props.updateTotal(newCartItems)
  }

    function createOrder(event) {
      event.preventDefault();
      const newOrder = {
        items: props.cartItems,
        user: user,
        orderDetails: checkoutData,
        isPaid: false,
        amount: props.total
      }
      const requestBody = { newOrder };
      axios
        .post(`${REACT_APP_API_URL}/api/createOrder`, requestBody)
        .then((res) => {
          // console.log("createOrder res:", res)
          setProceed(true)
        })
        .catch((error) => {
          console.log(error.response.data.message)
        });
    }


  return (
    <main className="cart-wrap-relative">
      {props.cartItems.length > 0 ?
      <Row>
        <Col sm={12} md={12} lg={6}>
          <div className="cart-container">
            <div className="cart-cards-container">
              {props.cartItems && props.cartItems.map((cartItem) => (
                <div className="horizontal-card">
                  <img className="horizontal-card-img" src={cartItem.product.images[0]} alt={cartItem.product.model} />
                  <div className="cart-details">
                    <div className="cart-details-top">
                      <h5>{cartItem.product.model}</h5>
                      <p className="cart-brand"><b>{cartItem.product.brand}</b></p>
                    </div>
                    <div className="cart-details-bottom">
                      <p>size : {cartItem.sizeChoice}</p>
                      <p>color : {cartItem.colorChoice}</p>
                    </div>
                  </div>
                  <h5 className="cart-price">{cartItem.product.price} €</h5>
                  <Button className="cart-delete-btn" variant="dark" onClick={()=> {deleteCartItem(cartItem)}}><MdOutlineCancel/></Button>
                </div>
              ))}
              </div>
            </div>
            <p>TOTAL : <b>{props.total} €</b> </p>
        </Col>
        <Col sm={12} md={12} lg={6}>
          {(!proceed && props.cartItems.length > 0) &&
            <Form onSubmit={createOrder} className="checkout-form">
              <Row className="mb-3">
                <Form.Group as={Col} sm={12} md={6} lg={6} controlId="formGridEmail">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter name" onChange={(e) =>
                        setCheckoutData({ ...checkoutData, name: e.target.value })
                      } />
                </Form.Group>

                <Form.Group as={Col} sm={12} md={6} lg={6} controlId="formGridPassword">
                  <Form.Label>Surname</Form.Label>
                  <Form.Control type="text" placeholder="Surname" onChange={(e) =>
                        setCheckoutData({ ...checkoutData, surname: e.target.value })
                      } />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} sm={12} md={6} lg={6} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" onChange={(e) =>
                        setCheckoutData({ ...checkoutData, name: e.target.value })
                      } />
                </Form.Group>

                <Form.Group as={Col} sm={12} md={6} lg={6} controlId="formGridPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter password" onChange={(e) =>
                        setCheckoutData({ ...checkoutData, surname: e.target.value })
                      } />
                </Form.Group>
              </Row>
              <Row className="mb-3">

              <Form.Group as={Col} sm={12} md={6} lg={6} controlId="formGridPassword">
                  <Form.Label>Phone nr</Form.Label>
                  <Form.Control type="number" placeholder="Phone nr" onChange={(e) =>
                        setCheckoutData({ ...checkoutData, phone: e.target.value })
                      } />
                </Form.Group>

              <Form.Group as={Col} sm={12} md={6} lg={6} className="mb-3" controlId="formGridAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control placeholder="1234 Main St" onChange={(e) =>
                  setCheckoutData({ ...checkoutData, address: e.target.value })}/>
              </Form.Group>

              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} sm={12} md={6} lg={6} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control onChange={(e) =>
                  setCheckoutData({ ...checkoutData, city: e.target.value })}/>
                </Form.Group>

                <Form.Group as={Col} sm={12} md={6} lg={6} controlId="formGridZip">
                  <Form.Label>Zip Code</Form.Label>
                  <Form.Control onChange={(e) =>
                  setCheckoutData({ ...checkoutData, zipCode: e.target.value })} />
                </Form.Group>
              </Row>
                <Form.Group as={Col} className="mb-3" id="formGridCheckbox">
                  <Form.Check type="checkbox" label="Create an account" />
                </Form.Group>
              <Button className="mt-3 mb-3" variant="dark" type="submit">
                Confirm and proceed to payment
              </Button>
            </Form>
          }
          {proceed &&
            <div className="payment-container">
              <div className="payment-btn">
                <AiOutlineCheckCircle/>
                <div>
                  <p>Order confirmed</p>
                  <p> Choose payment</p>
                </div>
              </div>

              <Payment order={order}/>
            </div>
          }

        </Col>
      </Row> :
      <h5>Your cart is empty</h5>
      }

    </main>
  )
}

export default Cart
