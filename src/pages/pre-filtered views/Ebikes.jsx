import Products from "../../pages/products/Products";
import { useState, useEffect } from "react";


//Take the products => filter by isEbike property => display Products component with E-bikes only (initially)
const Ebikes = (products) => {
  const [ebikes, setEbikes] = useState([])

  function filterEbikes() {
    const result = products?.filter((products) => { return products.isEbike })
    setEbikes(result)
  }

  useEffect(() => {
    filterEbikes();
}, []);

  return (
    <>
      {ebikes && <Products products={ebikes}></Products>}
    </>
  )
}

export default Ebikes
