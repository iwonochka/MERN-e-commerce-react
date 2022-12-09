import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage/HomePage";
import Products from "./pages/products/Products";
import Navbar from "./components/Navbar";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Cart from "./pages/cart/Cart";
import ProductDetails from './pages/product-details/ProductDetails';

function App() {
  return (
    <div className="App">
      <Navbar/>
        <Routes>
          <Route path="/" element={ <HomePage /> } />
          <Route path="/bikes" element={ <Products/> } />
          <Route path="/login" element={ <Login/> } />
          <Route path="/signup" element={ <Signup/> } />
          <Route path="/cart" element={ <Cart/> } />
          <Route path="/bikes/:productId" element={ <ProductDetails/> } />
        </Routes>
    </div>
  );
}

export default App;
