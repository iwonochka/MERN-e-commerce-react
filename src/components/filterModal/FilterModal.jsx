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
    // console.log(minItemPrice)
    brand: null,
    subcategory: null,
    isEbike: null,
    dataColors: [],
    maxItemPrice: 2485,
    minItemPrice: 734,
  });



  function handleSubmit(event) {

    event.preventDefault();
    // console.log("filterdata at the beginning:", filterData);
    // console.log("products", props.products);
    const filteredResult = props.products.filter((product) => {
      return (
        filterBy("brand", product) &&
        filterBy("subcategory", product) &&
        filterBy("isEbike", product) &&
        product.price <= filterData.maxItemPrice &&
        product.price >= filterData.minItemPrice &&
        (filterData.dataColors.length > 0
          ? filterData.dataColors.some(
              (item) => product.colors.indexOf(item) >= 0
            )
          : true)
      );
    });
    // console.log("result", filteredResult);
    props.setFilteredProducts(filteredResult);

    setFilterData({
      brand: null,
      subcategory: null,
      isEbike: null,
      dataColors: [],
      maxItemPrice: 2485,
      minItemPrice: 734,
    });
  }

  function filterBy(keyName, product) {
    // console.log("keyName:", filterData[keyName]);
    if (filterData[keyName] !== null) {
      return product[keyName] === filterData[keyName];
    } else {
      return true;
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
      ? setFilterData({ ...filterData, isEbike: true })
      : setFilterData({ ...filterData, isEbike: false });
  };

  useEffect(() => {}, [filterData]);

  return (
    <>
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
                    setFilterData({
                      ...filterData,
                      subcategory: e.target.value,
                    })
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
              <Button variant="dark" type="submit" onClick={()=>{props.setModalShow(false)}}>
                Filter
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

    </>
  );
};

export default FilterModal;
