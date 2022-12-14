import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./pages/homepage/HomePage";
import Products from "./pages/products/Products";
import Navbar from "./components/Navbar";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Cart from "./pages/cart/Cart";
import ProductDetails from "./pages/product-details/ProductDetails";
import About from "./pages/about/About";
import { useState, useContext } from "react";
import Payment from "./pages/payment/Payment";
import { AuthContext } from '../src/context/auth.context';
import Favs from "./pages/favs/Favs";
import axios from "axios";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [favs, setFavs] = useState([]);
  const {user} = useContext(AuthContext)
  const navigate = useNavigate()



  function addCartItem(product, sizeChoice, colorChoice) {
    const newItem = {
      product: product,
      sizeChoice: sizeChoice,
      colorChoice: colorChoice
    }
    const updatedCartItems = [...cartItems, newItem]
    setCartItems(updatedCartItems)
    console.log(cartItems)
    updateTotal(updatedCartItems)
  }

  function updateTotal(items) {
    const sum = items.reduce((acc, item) => {
      // console.log("acc", acc, "item.product.price", item.product.price)
      return acc + item.product.price}, 0)
    setTotal(sum)
  }

  function handleFavs(product) {
    if (user) {
      console.log(favs)
      favs.includes(product) ? deleteFav(product) : addFav(product)
    } else {
      navigate("/login")
    }
  }

  const addFav = (product) => {
    const newFavs = [...favs, product]
    setFavs(newFavs)
    console.log("new", newFavs)
    updateFavs(newFavs)
  }

  const deleteFav = (product) => {
    const newFavs = favs.filter((fav) => fav !== product )
    setFavs(newFavs)
    updateFavs(newFavs)
  }
  const getFavs = () => {
    console.log("hello")
    console.log("url", `${process.env.REACT_APP_API_URL}/api/favs/${user._id}`)
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/favs/${user._id}`)
      .then((response) => {
        console.log("response data favs", response.data.favs)

        setFavs(response.data.favs);
      })
      .catch((error) => console.log(error));
  };

  const updateFavs = () => {
    const requestBody = {favs, user};
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/updateFavs`, requestBody)
      .then((res) => {
        console.log("Sent data from updateFavs to POST updateFavs")
      })
      .catch((error) => {
        console.log(error.response.data.message)
      });
      // getFavs()
  };


  return (
    <div className="App">
      <Navbar cartItems={cartItems} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/bikes" element={<Products handleFavs={handleFavs} favs={favs} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              setCartItems={setCartItems}
              total={total}
              setTotal={setTotal}
              updateTotal={updateTotal}
            />
          }
        />
        <Route
          path="/bikes/:productId"
          element={
            <ProductDetails
              cartItems={cartItems}
              setCartItems={setCartItems}
              total={total}
              setTotal={setTotal}
              handleFavs={handleFavs}
              addCartItem={addCartItem}
            />
          }
        />
        <Route path="/payment" element={<Payment />} />
        <Route path="/favs" element={<Favs favs={favs} deleteFav={deleteFav} getFavs={getFavs}/>} />
      </Routes>
    </div>
  );
}
//
export default App;
