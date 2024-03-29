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
import { useState, useContext, useEffect } from "react";
import Payment from "./pages/payment/Payment";
import { AuthContext } from "../src/context/auth.context";
import Favs from "./pages/favs/Favs";
import MyOrders from "./pages/my-orders/MyOrders";
import axios from "axios";
import Footer from "./components/footer/Footer";
// const REACT_APP_API_URL = "http://localhost:5005";
const REACT_APP_API_URL = "https://vellox.cyclic.app";

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [favs, setFavs] = useState([]);
  const { user } = useContext(AuthContext);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const navigate = useNavigate();

  const getAllProducts = () => {
    axios
      .get(`${REACT_APP_API_URL}/api/products`)
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    user && getFavs();
  }, [user]);

  function addCartItem(product, sizeChoice, colorChoice) {
    const newItem = {
      product: product,
      sizeChoice: sizeChoice,
      colorChoice: colorChoice,
    };
    const updatedCartItems = [...cartItems, newItem];
    setCartItems(updatedCartItems);
    updateTotal(updatedCartItems);
  }

  function updateTotal(items) {
    const sum = items.reduce((acc, item) => {
      return acc + item.product.price;
    }, 0);
    setTotal(sum);
  }

  function clearCart() {
    setCartItems([]);
    updateTotal(0);
  }

  function isFav(product) {
    const result = [...favs]?.filter((fav) => {
      return fav._id === product._id;
    });
    return result.length > 0;
  }

  function handleFavs(product) {
    if (user) {
      isFav(product) ? deleteFav(product) : addFav(product);
    } else {
      navigate("/login");
    }
  }

  const addFav = (product) => {
    const requestBody = { product, user };
    axios
      .post(`${REACT_APP_API_URL}/api/addFavs`, requestBody)
      .then((res) => {
        getFavs();
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  const deleteFav = (product) => {
    const requestBody = { product, user };
    axios
      .post(`${REACT_APP_API_URL}/api/deleteFavs`, requestBody)
      .then((res) => {
        getFavs();
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
    getFavs();
  };
  const getFavs = () => {
    axios
      .get(`${REACT_APP_API_URL}/api/favs/${user._id}`)
      .then((response) => {
        setFavs(response.data.favs);
      })
      .catch((error) => console.log(error));
  };

  function setFilterFor(path) {
    switch (path) {
      case "/ebikes":
        setFilteredProducts(
          products.filter((product) => {
            return product.isEbike;
          })
        );
        break;
      case "/urban":
        setFilteredProducts(
          products.filter((product) => {
            return product.category === "urban";
          })
        );
        break;
      case "/hybrids":
        setFilteredProducts(
          products.filter((product) => {
            return product.subcategory === "hybrid";
          })
        );
        break;
      default:
        console.log("setFilterFor went to default!");
    }
  }

  return (
    <div className="App">
      <Navbar cartItems={cartItems} favs={favs} clearCart={clearCart} />
      <Routes>
        <Route path="/" element={<HomePage setFilterFor={setFilterFor} />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/ebikes"
          element={
            <Products
              products={products}
              handleFavs={handleFavs}
              favs={favs}
              isFav={isFav}
              getAllProducts={getAllProducts}
              filteredProducts={filteredProducts}
              setFilteredProducts={setFilteredProducts}
            />
          }
        />
        <Route
          path="/hybrids"
          element={
            <Products
              products={products}
              handleFavs={handleFavs}
              favs={favs}
              isFav={isFav}
              getAllProducts={getAllProducts}
              filteredProducts={filteredProducts}
              setFilteredProducts={setFilteredProducts}
            />
          }
        />
        <Route
          path="/urban"
          element={
            <Products
              products={products}
              handleFavs={handleFavs}
              favs={favs}
              isFav={isFav}
              getAllProducts={getAllProducts}
              filteredProducts={filteredProducts}
              setFilteredProducts={setFilteredProducts}
            />
          }
        />
        <Route
          path="/bikes"
          element={
            <Products
              handleFavs={handleFavs}
              favs={favs}
              isFav={isFav}
              products={products}
              getAllProducts={getAllProducts}
              filteredProducts={filteredProducts}
              setFilteredProducts={setFilteredProducts}
              setProducts={setProducts}
            />
          }
        />
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
              clearCart={clearCart}
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
              isFav={isFav}
              favs={favs}
            />
          }
        />
        <Route path="/payment" element={<Payment />} />
        <Route
          path="/favs"
          element={<Favs favs={favs} deleteFav={deleteFav} getFavs={getFavs} />}
        />
        <Route path="/myOrders" element={<MyOrders total={total} />} />
      </Routes>
      <Footer/>
    </div>
  );
}
//
export default App;
