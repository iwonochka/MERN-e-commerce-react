import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {

  const [product, setProduct] = useState(null);
  const { productId } = useParams();
  console.log(productId)

  const getProduct = () => {

    axios.get(`${process.env.REACT_APP_API_URL}/api/products/${productId}`)
    .then((response) => {
      const oneProduct = response.data;
      console.log("response data", response.data)
      setProduct(oneProduct);
    })
    .catch((error) => console.log(error));
  };

  useEffect(()=> {
    getProduct();
  }, [] );

  return (
  <div>
    {product && (<div>
        <p>{product.model}</p>
        <p>{product.price} €</p>
      </div>)}
  </div>
  )
}

export default ProductDetails
