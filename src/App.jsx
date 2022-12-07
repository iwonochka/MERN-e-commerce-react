import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage/HomePage";
import Products from "./pages/products/Products";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar/>
        <Routes>
          <Route path="/" element={ <HomePage /> } />
          <Route path="/bikes" element={ <Products/> } />
        </Routes>
    </div>
  );
}

export default App;
