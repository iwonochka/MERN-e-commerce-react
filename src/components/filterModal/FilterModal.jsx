import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import logo from '../../assets/vellox.png';
import Form from 'react-bootstrap/Form';
import Slider from '../slider/Slider'
import "./FilterModal.css"
import { useState } from "react";

const FilterModal = (props) => {
  const brands = [...new Set(props.products.map(product => product.brand))];
  const categories = [...new Set(props.products.map(product => product.subcategory))];
  const colors = [...new Set(props.products.flatMap(({colors}) => colors))];
  const minPrice = Math.min(...props.products.map(item => item.price));
  const maxPrice = Math.max(...props.products.map(item => item.price));

  const [filterData, setFilterData] = useState({
    brand: null,
    category: null,
    iseBike: null,
    dataColors: [],
    maxPrice: null,
    minPrice: null,
  });
  let colorsArr = []

  function handleSubmit(event) {
    event.preventDefault();
    console.log(filterData)
    setFilterData({})
    colorsArr = []
  }

  const handleColors = (e) => {
    colorsArr.push(e.target.value)
    // setFilterData({...filterData, dataColors: (filterData.dataColors, e.target.value)})
    setFilterData({...filterData, })
  }
  console.log()
  return (
    <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter"><img id="nav-logo" src={logo} alt="logo" /></Modal.Title>
    </Modal.Header>
    <Form onSubmit={handleSubmit}>
      <Modal.Body className="filter-form">
        <div>
          <Form.Select aria-label="brand" onChange={(e) => setFilterData({ ...filterData, brand: e.target.value })}>
            <option>Brand</option>
            {brands.map((brand)=> (
              <option value={brand}>{brand}</option>
            ))}
          </Form.Select>
          <Form.Select aria-label="category" onChange={(e) => setFilterData({ ...filterData, category: e.target.value })}>
            <option>Category</option>
            {categories.map((category)=> (
              <option value={category}>{category}</option>
            ))}
          </Form.Select>
        </div>
        <div>
          <Form.Check
          type="switch"
          name="isEbike"
          label="E-bike"
          onChange={(e) => setFilterData({ ...filterData, iseBike: e.target.value })}
          />
          <p>Colors:</p>
          {colors.map((color) => (
            <div className="form-check-inline">
              <input style={color === "white" ? {backgroundColor: "whitesmoke"} : {backgroundColor: color}} name={color} type="checkbox" value={color} id="inline-checkbox-1" className="form-check-input" aria-label={color} onChange={(e) => handleColors(e)}/>
            </div>
          ))}
        </div>
        <Slider minPrice={minPrice} maxPrice={maxPrice} setFilterData={setFilterData} filterData={filterData}/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" type="submit">Filter</Button>
      </Modal.Footer>
    </Form>
  </Modal>
  )
}

export default FilterModal
