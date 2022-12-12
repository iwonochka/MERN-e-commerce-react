import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import logo from "../../assets/vellox.png";
import Form from "react-bootstrap/Form";
import Slider from "../slider/Slider";
import ColorPicker from "../color-picker/ColorPicker";
import "./FilterModal.css";
import { useState, useEffect } from "react";

const FilterModal = (props) => {
  const brands = [...new Set(props.products.map((product) => product.brand))];
  const categories = [
    ...new Set(props.products.map((product) => product.subcategory)),
  ];
  const colors = [...new Set(props.products.flatMap(({ colors }) => colors))];
  const minPrice = Math.min(...props.products.map((item) => item.price));
  const maxPrice = Math.max(...props.products.map((item) => item.price));

  const [filterData, setFilterData] = useState({
    brand: null,
    category: null,
    iseBike: null,
    dataColors: [],
    maxPrice: maxPrice,
    minPrice: minPrice,
  });
 

  const newArray = [];



  function handleSubmit(event) {
    event.preventDefault();
    const keys = Object.keys(filterData);
    console.log(keys);
    keys.forEach((key) => {
      if (filterData[key]) {
        const output = props.products.map((item)=>
console.log("data filter oder", filterData )
            );
        newArray.push(...output);
      }
    });
    console.log(newArray)
    // const filteredResult = props.products.filter((product) => {return filterBy("brand", product) && filterBy("category", product) &&
    // filterBy("iseBike", product) && (product.maxPrice <= filterData.maxPrice) && (product.minPrice >= filterData.minPrice) && filterData.colors.some(item=> product.colors.indexOf(item) >= 0) })

    // console.log("filtered result", filteredResult)
    //set products to filtered products
    setFilterData({});
  }

  function filterBy(keyName, product) {
    console.log("keyName:", filterData[keyName]);
    if (filterData[keyName] !== null) {
      return product[keyName] === filterData[keyName];
    } else {
      return null;
    }
  }

  const handleColors = (e) => {
    e.target.checked
      ? setFilterData({
          ...filterData,
          dataColors: [...filterData.dataColors, e.target.value],
        })
      : setFilterData({
          ...filterData,
          dataColors: filterData.dataColors.filter(
            (color) => color !== e.target.value
          ),
        });
  };
  const handleeBike = (e) => {
    e.target.checked
      ? setFilterData({ ...filterData, iseBike: true })
      : setFilterData({ ...filterData, iseBike: false });
  };

  useEffect(() => {}, [filterData]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <img id="nav-logo" src={logo} alt="logo" />
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body className="filter-form">
          <div>
            <Form.Select
              aria-label="brand"
              onChange={(e) =>
                setFilterData({ ...filterData, brand: e.target.value })
              }
            >
              <option>Brand</option>
              {brands.map((brand) => (
                <option value={brand}>{brand}</option>
              ))}
            </Form.Select>
            <Form.Select
              aria-label="category"
              onChange={(e) =>
                setFilterData({ ...filterData, category: e.target.value })
              }
            >
              <option>Category</option>
              {categories.map((category) => (
                <option value={category}>{category}</option>
              ))}
            </Form.Select>
          </div>
          <div>
            <Form.Check
              type="switch"
              name="isEbike"
              label="E-bike"
              onChange={handleeBike}
            />
            <p>Colors:</p>
            <ColorPicker colors={colors} handleColors={handleColors} />
          </div>
          <div>
            <p>Price in €</p>
            <Slider
              minPrice={minPrice}
              maxPrice={maxPrice}
              setFilterData={setFilterData}
              filterData={filterData}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" type="submit">
            Filter
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default FilterModal;
