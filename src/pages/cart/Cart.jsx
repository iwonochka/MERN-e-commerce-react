import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Cart = (props) => {
  console.log("cart items:", props.cartItems)
  // function openCart() {
  //   localStorage.setItem("cart", JSON.stringify(props.cartItems));
  //   // getting back the object
  //   setCartItems(JSON.parse(localStorage.getItem("cart")));
  // }

  // useEffect(() => {
  //   openCart();
  // }, []);

  const {user} = useContext(AuthContext)
  const navigate = useNavigate()



  function deleteCartItem(cartItem) {
    const newCartItems = props.cartItems.filter((item) => item !== cartItem )
    props.setCartItems(newCartItems)
  }

  // function createOrder {
  //   const newOrder = {
  //     items: props.cartItems,
  //     user: user
  //   }
function createOrder() {
  const newOrder = {
        items: props.cartItems,
        user: user
      }
  const requestBody = { newOrder };
  axios
    .post(`${process.env.REACT_APP_API_URL}/api/order`, requestBody)
    .then((res) => {
      console.log("createOrder res:", res)
      navigate('/payment');
    })
    .catch((error) => {
      console.log(error.response.data.message)
    });
}


  return (
    <div>
      {props.cartItems.map((cartItem) => (
        <div>
          <p>{cartItem.product.model}</p>
          <p>{cartItem.sizeChoice}</p>
          <p>{cartItem.colorChoice}</p>
          <p>{cartItem.product.price} €</p>
          <button onClick={()=> {deleteCartItem(cartItem)}}>Remove</button>
        </div>
      ))}
      <p>{props.total} €</p>
      <button onClick={createOrder}>Proceed to checkout</button>

    </div>
  )
}

export default Cart
