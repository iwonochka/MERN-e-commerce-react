import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import logo from '../../assets/vellox.png';
import Form from 'react-bootstrap/Form';
import "./FilterModal.css"

const FilterModal = (props) => {
  const brands = [...new Set(props.products.map(product => product.brand))];
  const categories = [...new Set(props.products.map(product => product.subcategory))];
  const colors = [...new Set(props.products.flatMap(({colors}) => colors))];


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
    <Modal.Body>
      <Form>
        <Form.Select aria-label="Default select example">
          <option>Brand</option>
          {brands.map((brand)=> (
            <option value={brand}>{brand}</option>
          ))}
        </Form.Select>
        <Form.Select aria-label="Default select example">
          <option>Category</option>
          {categories.map((category)=> (
            <option value={category}>{category}</option>
          ))}
        </Form.Select>
        <Form.Check
        type="switch"
        name="isEbike"
        label="E-bike"
        />
        <p>Colors:</p>
        {colors.map((color) => (
          <div className="form-check-inline">
            <input style={color === "white" ? {backgroundColor: "whitesmoke"} : {backgroundColor: color}} name={color} type="checkbox" id="inline-checkbox-1" className="form-check-input" aria-label={color}/>
          </div>
        ))}
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="outline-dark" onClick={props.onHide}>Filter</Button>
    </Modal.Footer>
  </Modal>
  )
}

export default FilterModal
