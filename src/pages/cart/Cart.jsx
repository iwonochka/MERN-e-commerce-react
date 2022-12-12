import { useState } from "react";

const Cart = () => {
  const [cart, setCart] = useState({})
  function handleCart() {

    localStorage.setItem("cart", JSON.stringify(cart));
    // getting back the object
    const cartResponse = JSON.parse(localStorage.getItem("cart"));
  }

  function addToCart(product, size, color) {
    const newItem = {
      productId: product._id,
      sizeChoice: size,
      colorChoice: color
    }
    setCart([...cart, newItem])
  }

  return (
    <div>Cart</div>
  )
}

export default Cart
