import { useState, useEffect } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  console.log(process.env.REACT_APP_API_URL)

  const getAllProducts = () => {

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/products`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllProducts();
  }, [] );

  return (

    <div className="Products">
        {products.map((product) => {
          return (
            <div className="product card" key={product._id} >
              <h3>{product.model}</h3>
              <p>{product.price} €</p>
            </div>
          );
        })}
    </div>
  )
}

export default Products
