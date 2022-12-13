import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Payment from "../payment/Payment";


const Cart = (props) => {
  console.log("cart items:", props.cartItems)
  const [order, setOrder] = useState({})
  const [proceed, setProceed] = useState(false)

  function saveCartItems() {
    localStorage.setItem("cart-items", JSON.stringify(props.cartItems));
    // getting back the object
    props.setCartItems(JSON.parse(localStorage.getItem("cart-items")));
    console.log("cart-items from storage:", JSON.parse(localStorage.getItem("cart-items")))
  }

  useEffect(() => {
      saveCartItems();
  }, []);

  const {user} = useContext(AuthContext)
  const navigate = useNavigate()

  function deleteCartItem(cartItem) {
    const newCartItems = props.cartItems.filter((item) => item !== cartItem )
    props.setCartItems(newCartItems)
  }


  function handleOrder() {
    const newOrder = {
          items: props.cartItems,
          user: user
        }
    setOrder(newOrder)
    setProceed(true)

    // const requestBody = { newOrder };
    // axios
    //   .post(`${process.env.REACT_APP_API_URL}/api/order`, requestBody)
    //   .then((res) => {
    //     console.log("createOrder res:", res)
    //     navigate('/payment');
    //   })
    //   .catch((error) => {
    //     console.log(error.response.data.message)
    //   });
    }


  return (
    <div>
      {props.cartItems && props.cartItems.map((cartItem) => (
        <div>
          <p>{cartItem.product.model}</p>
          <p>{cartItem.sizeChoice}</p>
          <p>{cartItem.colorChoice}</p>
          <p>{cartItem.product.price} €</p>
          <button onClick={()=> {deleteCartItem(cartItem)}}>Remove</button>
        </div>
      ))}
      <p>{props.total} €</p>
      {!proceed && <button onClick={handleOrder}>Proceed to checkout</button>}
      {proceed &&
        <Payment order={order}/>
      }

    </div>
  )
}

export default Cart
