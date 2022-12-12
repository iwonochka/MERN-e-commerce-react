import { useState, useEffect } from "react";

const Cart = (props) => {
  console.log("cart items:", props.cartItems)
  // function openCart() {
  //   localStorage.setItem("cart", JSON.stringify(props.cartItems));
  //   // getting back the object
  //   setCart(JSON.parse(localStorage.getItem("cart")));
  // }

  // useEffect(() => {
  //   openCart();
  // }, []);

  return (
    <div>
      {props.cartItems.map((cartItem) => (
        <div>
          <p>{cartItem.product.model}</p>
          <p>{cartItem.sizeChoice}</p>
          <p>{cartItem.colorChoice}</p>
        </div>
      ))}
    </div>
  )
}

export default Cart
